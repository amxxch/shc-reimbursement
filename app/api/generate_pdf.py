from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pdfrw import PdfReader, PdfWriter, PdfDict, PdfName
import requests
import os
from datetime import datetime
import tempfile

app = FastAPI()

API_URL = "https://shc-reimbursement.vercel.app/api/requests"
TEMPLATE_PATH = "Reimbursement Claims Form.pdf"  # 模板要放服务器上，后面处理

def get_request_data(request_id):
    response = requests.get(API_URL)
    if response.status_code == 200:
        data = response.json()
        for request in data:
            if request.get("request_id") == request_id:
                return request
        raise HTTPException(status_code=404, detail=f"Request ID {request_id} not found")
    raise HTTPException(status_code=response.status_code, detail="Failed to fetch data")

def map_data_to_form(request_data):
    form_data = {}
    checkbox_data = {}
    
    form_data["Event Name"] = request_data.get("event_name", "")
    event_date = request_data.get("event_date", "")
    form_data["Event Date"] = datetime.strptime(event_date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d") if event_date else ""
    form_data["Organizing Committee"] = request_data.get("organizing_committee") or "Student Committee"
    form_data["Approximate Number of Participants"] = str(request_data.get("num_of_participants", ""))
    form_data["Location"] = request_data.get("location", "")
    form_data["Name of the Contact Person"] = f"{request_data.get('first_name', '')} {request_data.get('last_name', '')}".strip()
    form_data["Tel of the Contact Person"] = request_data.get("phone_number", "")
    form_data["Email of the Contact Person"] = request_data.get("email", "")
    form_data["Name of the Claimant"] = "Same as the contact person"
    form_data["Email of the Claimant"] = "Same as the contact person"
    form_data["UID"] = request_data.get("uid", "")
    form_data["Total Amount to be reimbursed"] = str(request_data.get("total_amount", ""))
    form_data["Total Number of Receipts submitted"] = str(len(request_data.get("receipts", [])))
    email_poster = request_data.get("email_poster")
    participant_list = request_data.get("participant_list")
    form_data["Supporting Documents Submitted"] = "YES" if (email_poster or participant_list) else "NO"
    
    checkbox_data["SameAsContact_Name"] = PdfName.CheckMark
    checkbox_data["SameAsContact_Email"] = PdfName.CheckMark
    checkbox_data["SupportingDocs_Yes"] = PdfName.CheckMark if form_data["Supporting Documents Submitted"] == "YES" else PdfName.Off
    checkbox_data["SupportingDocs_No"] = PdfName.CheckMark if form_data["Supporting Documents Submitted"] == "NO" else PdfName.Off
    
    receipts = request_data.get("receipts", [])
    expenditure_records = []
    for i, receipt in enumerate(receipts[:7], 1):
        if i <= 3:
            expenditure_records.append({
                f"Description_{i}": receipt.get("description", ""),
                f"Amount_{i}": str(receipt.get("amount", ""))
            })
        elif i >= 4:
            expenditure_records.append({
                str(i): str(i),
                f"Description_{i}": receipt.get("description", ""),
                f"Amount_{i}": str(receipt.get("amount", ""))
            })
    
    form_data["Total Amount to be Reimbursed"] = str(request_data.get("total_amount", ""))
    
    return form_data, checkbox_data, expenditure_records

def fill_pdf_template(template_path, form_data, checkbox_data, expenditure_records):
    reader = PdfReader(template_path)
    writer = PdfWriter()

    field_values = {}
    field_values.update(form_data)
    field_values.update(checkbox_data)
    for record in expenditure_records:
        field_values.update(record)

    for page in reader.pages:
        annotations = page.Annots
        if annotations:
            for annot in annotations:
                field_name = annot.get('/T')
                if field_name:
                    field_name = field_name[1:-1]
                    if field_name in field_values:
                        value = field_values[field_name]
                        if field_name in checkbox_data:
                            annot.update(PdfDict(V=value, AS=value))
                        else:
                            annot.update(PdfDict(V=str(value)))
        writer.addpage(page)

    # 用临时文件保存 PDF
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        writer.write(temp_file.name)
        return temp_file.name

@app.get("/api/generate-pdf/{request_id}")
async def generate_reimbursement_form(request_id: int):
    request_data = get_request_data(request_id)
    if not request_data:
        raise HTTPException(status_code=500, detail="Unable to fetch request data")
    
    form_data, checkbox_data, expenditure_records = map_data_to_form(request_data)
    output_filename = f"Reimbursement Claims Form_{request_id}.pdf"
    
    # 生成临时 PDF 文件
    output_path = fill_pdf_template(TEMPLATE_PATH, form_data, checkbox_data, expenditure_records)
    
    return FileResponse(output_path, filename=output_filename, media_type='application/pdf')