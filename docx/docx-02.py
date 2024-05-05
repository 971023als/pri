from docx import Document
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

def set_repeat_table_header(row):
    """Set a row of the table as a repeated header row when table spans over multiple pages."""
    tr = row._tr
    trPr = tr.get_or_add_trPr()
    tblHeader = OxmlElement('w:tblHeader')
    tblHeader.set(qn('w:val'), "true")
    trPr.append(tblHeader)

def create_docx_privacy_policy():
    doc = Document()
    doc.add_heading('개인정보처리방침', 0)

    # 제2조 제목
    doc.add_heading('제2조(개인정보의 처리 및 보유기간)', level=1)

    # 내용 추가
    doc.add_paragraph(
        "① 밥누리진흥공단은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다."
    )
    doc.add_paragraph(
        "② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다."
    )

    # 테이블 생성
    table = doc.add_table(rows=1, cols=5)
    hdr_cells = table.rows[0].cells
    hdr_cells[0].text = '카테고리'
    hdr_cells[1].text = '개인정보 파일명'
    hdr_cells[2].text = '운영 근거'
    hdr_cells[3].text = '처리 항목'
    hdr_cells[4].text = '보유기간'

    # 헤더 반복 설정
    set_repeat_table_header(table.rows[0])

    # 데이터 입력
    records = [
        ('개인회원', '밥누리홈페이지 회원 정보', '정보주체의 동의', '필수: 아이디, 비밀번호, 성명, 이메일, 집주소', '계정 해지시까지, 최종 로그인부터 1년까지'),
        ('개인회원', '밥누리홈페이지 미성년자 회원의 법정 대리인 정보', '정보주체의 동의', '필수: 성명, 생년월일, 이메일', '계정 해지시까지, 최종 로그인부터 1년까지'),
        # 다른 레코드도 같은 방식으로 추가
    ]

    for cat, file_name, basis, items, duration in records:
        row_cells = table.add_row().cells
        row_cells[0].text = cat
        row_cells[1].text = file_name
        row_cells[2].text = basis
        row_cells[3].text = items
        row_cells[4].text = duration

    # 문서 저장
    doc.save('Privacy_Policy_Section2.docx')

create_docx_privacy_policy()
