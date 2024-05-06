# Create a new Excel workbook and sheet for Article 11
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Privacy Rights Remedies"

# Adding content to the sheet
rows = [
    ["제11조(정보주체의 권익침해에 대한 구제방법)"],
    ["① 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보 분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다."],
    ["▶ 개인정보 침해신고센터 (한국인터넷진흥원 운영)"],
    ["- 소관업무", "개인정보 침해사실 신고, 상담 신청"],
    ["- 홈페이지", "privacy.kisa.or.kr"],
    ["- 전화", "118"],
    ["- 주소", "전라남도 나주시 진흥길 9 (빛가람동) 개인정보침해 신고센터"],
    ["▶ 개인정보 분쟁조정위원회"],
    ["- 소관업무", "개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)"],
    ["- 홈페이지", "www.kopico.go.kr"],
    ["- 전화", "1833-6972"],
    ["- 주소", "서울특별시 종로구 세종대로 209 정부서울청사 12층"],
    ["▶ 대검찰청 사이버범죄수사단"],
    ["- 전화", "1301"],
    ["- 홈페이지", "www.spo.go.kr"],
    ["▶ 경찰청 사이버안전국"],
    ["- 전화", "182"],
    ["- 홈페이지", "https://ecrm.police.go.kr/minwon/main"]
]

for row in rows:
    ws.append(row)

# Set column width for better readability
ws.column_dimensions['A'].width = 40
ws.column_dimensions['B'].width = 80

# Save the workbook
excel_file_path = "/mnt/data/Article_11_Privacy_Rights_Remedies.xlsx"
wb.save(excel_file_path)
excel_file_path
