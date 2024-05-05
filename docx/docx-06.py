from docx import Document
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

def create_docx_privacy_policy_section6():
    doc = Document()
    doc.add_heading('개인정보처리방침', 0)

    # 제6조 제목
    doc.add_heading('제6조(개인정보처리의 위탁에 관한 사항)', level=1)

    # 내용 추가
    doc.add_paragraph(
        "① 밥누리 진흥공단은 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다."
    )

    # 테이블 생성 및 데이터 입력
    table = doc.add_table(rows=3, cols=4)
    hdr_cells = table.rows[0].cells
    hdr_cells[0].text = '개인정보 파일명'
    hdr_cells[1].text = '수탁 업체'
    hdr_cells[2].text = '수탁 업무 내용'
    hdr_cells[3].text = '보유 및 이용기간'

    data = [
        ("창업 자금 대출 신청자 정보", "해당 취급 은행", "융자지원의 설정, 유지, 이행, 관리 등", "2023.7.17 ~ 2025.7.17"),
        ("회원가입 정보", "Amazon Web Services, Inc", "Amazon 클라우드 컴퓨팅 환경에 개인정보 보관", "회원 탈퇴 또는 위탁 계약 종료 시")
    ]

    for idx, row_data in enumerate(data, start=1):
        for col_idx, text in enumerate(row_data):
            table.rows[idx].cells[col_idx].text = text

    doc.add_paragraph(
        "② 밥누리 진흥공단은 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적・관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리・감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다."
    )
    doc.add_paragraph(
        "③ 「개인정보 보호법」 제26조 제6항에 따라 수탁자가 당사의 개인정보 처리업무를 재 위탁하는 경우 동의를 받고 있습니다."
    )
    doc.add_paragraph(
        "④ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보처리방침을 통하여 공개하도록 하겠습니다."
    )

    # 문서 저장
    doc.save('Privacy_Policy_Section6.docx')

create_docx_privacy_policy_section6()
