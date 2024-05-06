# Create a new Excel workbook and sheet for Article 8
wb2 = openpyxl.Workbook()
ws2 = wb2.active
ws2.title = "Security Measures"

# Adding content to the sheet for Article 8
article_8_rows = [
    ["제8조(개인정보의 안전성 확보조치에 관한 사항)"],
    ["① 밥누리진흥공단은 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.", 
     "1. 개인정보 취급 직원의 최소화 및 교육", 
     "▶ 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.",
     "2. 내부관리계획의 수립 및 시행",
     "▶ 개인정보의 안전한 처리를 위하여 내부 보호지침을 제정하고, 매년 개인정보보호 세부추진계획을 수립하여 시행하고 있습니다.",
     "3. 개인정보의 암호화",
     "▶ 개인정보는 암호화 등을 통해 안전하게 저장 및 관리되고 있습니다. 또한 중요한 데이터는 저장 및 전송 시 암호화하여 사용하는 등의 별도 보안기능을 사용하고 있습니다.",
     "4. 해킹 등에 대비한 기술적 대책",
     "▶ 밥누리진흥공단은 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.",
     "5. 개인정보에 대한 접근 제한",
     "▶ 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근 통제를 위하여 필요한 조치를 하고 있습니다.",
     "6. 접속기록의 보관 및 위변조 방지",
     "▶ 개인정보처리시스템에 접속한 기록(웹 로그, 요약정보 등)을 최소1년 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다.",
     "7. 비인가자에 대한 출입 통제",
     "▶ 개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다."
    ]
]

for row in article_8_rows:
    ws2.append(row)

# Set column width for better readability
ws2.column_dimensions['A'].width = 100
ws2.column_dimensions['B'].width = 100
ws2.column_dimensions['C'].width = 100

# Save the workbook
article_8_excel_file_path = "/mnt/data/Article_8_Security_Measures.xlsx"
wb2.save(article_8_excel_file_path)
article_8_excel_file_path
