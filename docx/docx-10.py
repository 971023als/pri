# Create a new Document for Article 10
doc = Document()
doc.add_heading('제10조(개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)', level=1)

# Adding content to the document
content = [
    "① 밥누리 진흥공단은 사용자에게 개별적인 서비스와 편의를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.",
    "② 쿠키는 웹사이트 운영에 이용되는 서버(http)가 정보주체의 브라우저에 보내는 소량의 정보이며 정보주체의 PC 또는 모바일에 저장됩니다.",
    "③ 정보주체는 웹 브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의 설정을 할 수 있습니다. 다만, 쿠키 저장을 거부할 경우 로그인이 필요한 일부서비스 이용에 어려움이 발생할 수 있습니다.",
    "< 쿠키 허용 / 차단 방법 >",
    "▶ 웹 브라우저에서 쿠키 허용/차단:",
    "- 크롬(Chrome): 웹 브라우저 설정 > 개인정보 보호 및 보안 > 인터넷 사용 기록 삭제",
    "- 엣지(Edge): 웹 브라우저 설정 > 쿠키 및 사이트 권한 > 쿠키 및 사이트 데이터 관리 및 삭제",
    "▶ 모바일 브라우저에서 쿠키 허용/차단:",
    "- 크롬(Chrome): 모바일 브라우저 설정 > 개인정보 보호 및 보안 > 인터넷 사용 기록 삭제",
    "- 사파리(Safari): 모바일 기기 설정 > 사파리(Safari) > 고급 > 모든 쿠키 차단",
    "- 삼성 인터넷: 모바일 브라우저 설정 > 인터넷 사용 기록 > 인터넷 사용 기록 삭제"
]

for para in content:
    doc.add_paragraph(para)

# Save the document
file_path = "/mnt/data/Article_10_Cookie_Policy.docx"
doc.save(file_path)
file_path
