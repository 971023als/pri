import pandas as pd

def create_excel_privacy_policy_section4():
    # 데이터 준비
    data = {
        "개인정보 파일명": [
            "창업 자금 대출 신청자 정보", "창업 기술 교육 신청자 정보", "창업 컨설팅 신청자 정보", "법률 자문 및 경영 진단 신청자 정보"
        ],
        "제공받는자": [
            "중소벤처기업부, 해당 지자체, 신용보증재단중앙회, 신용보증기금, 기술보증기금, 정부(중앙부처, 지자체)",
            "기술 교육 업체",
            "컨설팅 업체",
            "컨설팅 업체"
        ],
        "제공 목적": [
            "- 융자지원 신청 내용 확인 및 본인의 신용을 판단하기 위한 자료로 활용 - 공공기관에서 정책 자료로 활용 - 소상공인 연계 지원 업무, 성과 분석, 고객 만족도 조사, 기타 법령상 의무 이행 및 사후 관리",
            "소상공인에게 각 분야별 기술 교육 제공",
            "소상공인 기업에 컨설팅 제공",
            "소상공인 기업에 컨설팅 제공"
        ],
        "제공하는 항목": [
            "성명, 주민등록번호, 집주소, 휴대전화번호",
            "성명, 휴대전화번호, 이메일주소, 사업계획서",
            "성명, 휴대전화번호, 이메일주소, 사업계획서",
            "성명, 휴대전화번호, 이메일주소, 사업장 총괄 카드"
        ],
        "보유기간(관련 근거)": [
            "1. 「개인정보보호법」제15조제1항 제1호, 제17조제1항제1호, 제23조제1항제1호, 제24조제1항제1호 2. 「신용정보의 이용 및 보호에 관한 법률」제32조제1항, 제2항, 제33조, 제34조 3. 「금융실명거래 및 비밀보장에 관한 법률」 제3조, 동법 시행령 제3조 4. 「소상공인 보호 및 지원에 관한 법률 시행령」 제13조 제2항 5. 정보주체의 동의",
            "정보주체의 동의",
            "정보주체의 동의",
            "정보주체의 동의"
        ]
    }
    
    # 데이터 프레임 생성
    df = pd.DataFrame(data)
    
    # Excel 파일로 저장
    with pd.ExcelWriter('Privacy_Policy_Section4.xlsx', engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='개인정보의 제3자 제공에 관한 사항')

create_excel_privacy_policy_section4()
