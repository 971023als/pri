from docx import Document
from docx.shared import Pt
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

def create_docx_privacy_policy_section5():
    doc = Document()
    doc.add_heading('개인정보처리방침', 0)

    # 제5조 제목
    doc.add_heading('제5조(개인정보의 파기절차 및 파기방법)', level=1)

    # 내용 추가
    doc.add_paragraph(
        "① 밥누리 진흥공단은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다."
    )
    doc.add_paragraph(
        "② 정보주체로부터 동의 받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관 장소를 달리하여 보존합니다."
    )
    doc.add_paragraph(
        "※ 다른 법령에 따라 보존하는 개인정보의 항목과 보존 근거는“제2조 개인정보의 처리 및 보유기간” 항목에서 확인 가능"
    )
    doc.add_paragraph(
        "③ 개인정보 파기의 절차 및 방법은 다음과 같습니다."
    )
    doc.add_paragraph(
        "1. 파기절차\n밥누리 진흥공단은 파기하여야 하는 개인정보에 대해 개인정보 파기계획을 수립하여 파기합니다. 협의회는 파기 사유가 발생한 개인정보를 선정하고, 협의회는 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다. 또한, 보존기간이 경과하거나 목적이 달성된 개인정보는 내부 방침 및 기타 관련 법령에 따라 파기합니다."
    )
    doc.add_paragraph(
        "2. 파기방법\n밥누리 진흥공단은 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다."
    )

    # 문서 저장
    doc.save('Privacy_Policy_Section5.docx')

create_docx_privacy_policy_section5()
