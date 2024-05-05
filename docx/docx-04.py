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

def create_docx_privacy_policy_section4():
    doc = Document()
    doc.add_heading('개인정보처리방침', 0)

    # 제4조 제목
    doc.add_heading('제4조(개인정보의 제3자 제공에 관한 사항)', level=1)

    # 내용 추가
    doc.add_paragraph(
        "① 밥누리 진흥공단은 정보주체의 개인정보를 개인정보의 처리 목적에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공하고 그 이외에는 정보주체의 개인정보를 제3자에게 제공하지 않습니다."
    )
    doc.add_paragraph(
        "② 밥누리 진흥공단은 원활한 서비스 제공을 위해 다음 경우 개인정보 보호법 제17조 제1항 제1호에 따라 정보주체의 동의를 얻어 필요 최소한의 범위로만 제공합니다."
    )

    # 테이블 생성
    table = doc.add_table(rows=1, cols=5)
    hdr_cells = table.rows[0].cells
    hdr_cells[0].text = '개인정보 파일명'
    hdr_cells[1].text = '제공받는자'
    hdr_cells[2].text = '제공 목적'
    hdr_cells[3].text = '제공하는 항목'
    hdr_cells[4].text = '보유기간(관련 근거)'

    # 헤더 반복 설정
    set_repeat_table_header(table.rows[0])

    # 데이터 입력
    records = [
        ("창업 자금 대출 신청자 정보", "중소벤처기업부, 해당 지자체, 신용보증재단중앙회, 신용보증기금, 기술보증기금, 정부(중앙부처, 지자체)",
         "- 융자지원 신청 내용 확인 및 본인의 신용을 판단하기 위한 자료로 활용 - 공공기관에서 정책 자료로 활용 - 소상공인 연계 지원 업무, 성과 분석, 고객 만족도 조사, 기타 법령상 의무 이행 및 사후 관리",
         "성명, 주민등록번호, 집주소, 휴대전화번호",
         "1. 「개인정보보호법」제15조제1항 제1호, 제17조제1항제1호, 제23조제1항제1호, 제24조제1항제1호 2. 「신용정보의 이용 및 보호에 관한 법률」제32조제1항, 제2항, 제33조, 제34조 3. 「금융실명거래 및 비밀보장에 관한 법률」 제3조, 동법 시행령 제3조 4. 「소상공인 보호 및 지원에 관한 법률 시행령」 제13조 제2항 5. 정보주체의 동의"),
        # 다른 레코드도 같은 방식으로 추가
    ]

    for file_name, recipient, purpose, items, duration in records:
        row_cells = table.add_row().cells
        row_cells[0].text = file_name
        row_cells[1].text = recipient
        row_cells[2].text = purpose
        row_cells[3].text = items
        row_cells[4].text = duration

    # 문서 저장
    doc.save('Privacy_Policy_Section4.docx')

create_docx_privacy_policy_section4()
