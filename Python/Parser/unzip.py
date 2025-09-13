import zipfile
from lxml import etree
import json

docx_file = r"C:\Users\Legion Y40\Desktop\_engineering\Python\Parser\sample\sample.docx"

with zipfile.ZipFile(docx_file, 'r') as z:
    xml_bytes = z.read('word/document.xml')

root = etree.fromstring(xml_bytes)
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

json_object = []

for p_id, p in enumerate(root.findall('.//w:body/w:p', ns), start=1):
    paragraph = {"paragraph_id": p_id, "runs": []}
    for r_id, r in enumerate(p.findall('.//w:r', ns), start=1):
        # get text
        t_elem = r.find('.//w:t', ns)
        text = t_elem.text if t_elem is not None else ""

        # get style
        style_elem = r.find('.//w:rPr', ns)
        style = {}
        if style_elem is not None:
            if style_elem.find('.//w:b', ns) is not None:
                style["bold"] = True
            if style_elem.find('.//w:i', ns) is not None:
                style["italic"] = True
            if style_elem.find('.//w:u', ns) is not None:
                style["underline"] = True

        paragraph["runs"].append({
            "run_id": r_id,
            "text": text,
            "style": style
        })

    if paragraph["runs"]:  # only keep non-empty paragraphs
        json_object.append(paragraph)

# save to file
with open("docx_content.json", "w", encoding="utf-8") as f:
    json.dump(json_object, f, indent=4, ensure_ascii=False)

print(json.dumps(json_object, indent=4, ensure_ascii=False))

with open("docx_content.json", "r", encoding="utf-8") as f:
    for paragraph in f:
        for run in runs:
            for t in texts:
                print(t)

