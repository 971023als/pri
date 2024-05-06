from docx import Document

# Create a new Document
doc = Document()
doc.add_heading('제7조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)', level=1)

# Adding content to the document
content = [
    ("① 밥누리 진흥공단은 협의회에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.", None),
    ("② 제1항에 따른 권리 행사는 “제9조(개인정보 보호책임자의 성명 또는 개인정보 보호업무 및 관련 고충사항)”를 통한 서면, 전자우편 등을 통하여 하실 수 있으며, 협의회는 이에 대해 지체 없이 조치하겠습니다.", None),
    ("③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 서식에 따른 위임장을 제출하셔야 합니다.", None),
    ("④ 개인정보 열람 및 처리정지 요구는 개인정보보호법에 의하여 정보주체의 권리가 제한 될 수 있습니다.", [
        ("가. 법률에 따라 열람이 금지되거나 제한되는 경우", None),
        ("나. 다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우", None),
        ("다. 밥누리 진흥공단가 다음 각 목의 어느 하나에 해당하는 업무를 수행할 때 중대한 지장을 초래하는 경우", None)
    ]),
    ("⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.", None),
    ("⑥ 밥누리진흥공단은 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.", None)
]

for para, sublist in content:
    doc.add_paragraph(para)
    if sublist:
        for sub_para, sub_sublist in sublist:
            doc.add_paragraph(sub_para, style='ListBullet')

# Save the document
file_path = "/mnt/data/Information_Subject_Rights_and_Responsibilities.docx"
doc.save(file_path)
file_path
