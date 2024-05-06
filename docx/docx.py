import os
from docx import Document

# 문서 생성
doc = Document()
doc.add_heading('HWP Python Scripts', level=1)

# 스크립트 파일 목록
script_files = [f"hwp-{i:02}.py" for i in range(0, 13)]  # 0부터 12까지 파일명 생성

# 각 파일의 내용을 읽어서 DOCX 문서에 추가
for script in script_files:
    if os.path.exists(script):  # 파일이 존재하는지 확인
        doc.add_heading(script, level=2)  # 파일 이름을 제목으로 추가
        with open(script, 'r', encoding='utf-8') as file:  # 파일 열기
            content = file.read()  # 내용 읽기
            doc.add_paragraph(content)  # 내용을 문서에 추가
    else:
        doc.add_heading(script, level=2)
        doc.add_paragraph("File does not exist.")  # 파일이 없을 경우 메시지 추가

# 문서 저장
doc.save('/mnt/data/HWP_Scripts_Documentation.docx')
