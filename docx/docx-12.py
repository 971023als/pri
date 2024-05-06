# Create a new Document for Articles 11 and 12
doc = Document()
doc.add_heading('제12조(개인정보 처리방침의 변경에 관한 사항)', level=1)
doc.add_paragraph("① 이 개인정보 처리방침은 2024년 5월 6일부터 개정되어 적용됩니다.")
doc.add_paragraph("② 이전의 개인정보 처리방침은 아래에서 확인할 수 있습니다.")
doc.add_paragraph("[이전 내용 바로가기] 1. 2024년 5월 6일 이전방침")

doc.add_heading('제11조(정보주체의 권익침해에 대한 구제방법) 추가 내용', level=1)
doc.add_paragraph(
    "② 협의회는 정보주체의 개인정보자기결정권을 보장하고, 개인정보침해로 인한 상담 및 피해 구제를 위해 노력하고 있으며, 신고나 상담이 필요한 경우 아래의 담당부서로 연락해 주시기 바랍니다."
)
doc.add_paragraph("▶ 개인정보보호 관련 고객 상담 및 신고")
doc.add_paragraph("- 성명: 000")
doc.add_paragraph("- 부서명: 한국침해사고대응팀협의회 사무국")
doc.add_paragraph("- 전화번호: 000-0000-0000")
doc.add_paragraph("- 이메일: alsguddl@gmail.com")

# Save the document
file_path = "/mnt/data/Article_11_12_Privacy_Policy_Changes.docx"
doc.save(file_path)
file_path
