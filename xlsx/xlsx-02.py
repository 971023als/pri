import pandas as pd

def create_excel_privacy_policy():
    # 데이터 프레임 생성
    data = {
        '카테고리': ['개인회원', '개인회원', '기업회원', '기업회원', '기업회원'],
        '개인정보 파일명': ['밥누리홈페이지 회원 정보', '밥누리홈페이지 미성년자 회원의 법정 대리인 정보', '밥누리홈페이지 회원 정보', '밥누리홈페이지 미성년자 회원의 법정 대리인 정보', '창업 자금 대출 신청자 정보'],
        '운영 근거': ['정보주체의 동의'] * 5,
        '처리 항목': [
            '필수: 아이디, 비밀번호, 성명, 이메일, 집주소',
            '필수: 성명, 생년월일, 이메일',
            '필수: 아이디, 비밀번호, 성명, 이메일, 집주소',
            '필수: 성명, 생년월일, 이메일',
            '필수: 성명, 전화번호, 주민등록번호, 이메일, 집주소, 사업계획서, 선택: 근로자 고용 정보'
        ],
        '보유기간': [
            '계정 해지시까지, 최종 로그인부터 1년까지',
            '계정 해지시까지, 최종 로그인부터 1년까지',
            '계정 해지시까지, 최종 로그인부터 1년까지',
            '계정 해지시까지, 최종 로그인부터 1년까지',
            '융자지원 종료일 이후 5년'
        ]
    }

    df = pd.DataFrame(data)

    # Excel 파일로 저장
    with pd.ExcelWriter('Privacy_Policy_Section2.xlsx', engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='개인정보 처리 및 보유기간')

create_excel_privacy_policy()
