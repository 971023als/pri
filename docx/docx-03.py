from docx import Document
from docx.shared import Pt
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

def set_repeat_table_header(row):
    """Set a row of the table as a repeated header row when table spans over multiple pages."""
    tr = row._tr
    trPr = tr.get_or_add_trPr()
    tblHeader = OxmlElement('w:tblHeader')
    tblHeader.set(qn('w:val'), "true")
    trPr.append(tblHeader)

def create_docx_privacy_policy_section3():
    doc = Document()
    doc.add_heading('개인정보처리방침', 0)

    # 제3조 제목
    doc.add_heading('제3조(처리하는 개인정보의 항목)', level=1)

    # 테이블 생성
    table = doc.add_table(rows=1, cols=5)
    hdr_cells = table.rows[0].cells
    hdr_cells[0].text = '개인정보 파일명'
    hdr_cells[1].text = '운영 근거'
    hdr_cells[2].text = '처리 항목'
    hdr_cells[3].text = '보유기간'
    hdr_cells[4].text = '관련 근거'

    # 헤더 반복 설정
    set_repeat_table_header(table.rows[0])

    # 데이터 입력
    records = [
        ("밥누리홈페이지 회원 정보", "정보주체의 동의", "필수: 아이디, 비밀번호, 성명, 이메일, 집주소", "계정 해지시까지, 최종 로그인부터 1년까지", ""),
        ("밥누리홈페이지 미성년자 회원의 법정 대리인 정보", "정보주체의 동의", "필수: 성명, 생년월일, 이메일", "계정 해지시까지, 최종 로그인부터 1년까지", ""),
        # 다른 레코드도 같은 방식으로 추가
    ]

    for name, basis, items, duration, law in records:
        row_cells = table.add_row().cells
        row_cells[0].text = name
        row_cells[1].text = basis
        row_cells[2].text = items
        row_cells[3].text = duration
        row_cells[4].text = law

    # 문서 저장
    doc.save('Privacy_Policy_Section3.docx')

create_docx_privacy_policy_section3()
