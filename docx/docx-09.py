from docx import Document

# Create a new Document
doc = Document()
doc.add_heading('제9조(개인정보 보호책임자의 성명 또는 개인정보 보호업무 및 관련 고충사항)', level=1)

# Adding content to the document
content = [
    ("① 밥누리진흥공단은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호 책임자를 지정하고 있습니다.", None),
    ("▶ 개인정보 보호책임자", None),
    ("- 성명", "000"),
    ("- 부서명", "000"),
    ("- 전화번호", "000-0000-0000"),
    ("- 이메일", "alsguddl@gmail.com"),
    ("▶ 개인정보보호 담당부서", None),
    ("- 성명", "000"),
    ("- 부서명", "000"),
    ("- 전화번호", "000-0000-0000"),
    ("- 이메일", "alsguddl@gmail.com"),
    ("② 정보주체는 협의회의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 협의회는 정보주체의 문의에 대해 지체 없이 답변 및 처리해 드릴 것입니다.", None)
]

for para, data in content:
    if data:
        p = doc.add_paragraph()
        p.add_run(para).bold = True
        p.add_run(data)
    else:
        doc.add_paragraph(para)

# Save the document
file_path = "/mnt/data/Article_9_Privacy_Officer_Information.docx"
doc.save(file_path)
file_path
