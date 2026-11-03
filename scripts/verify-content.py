"""Verify source preservation in the exported page and serialized interactive panels."""
import re, json, html
from pathlib import Path
root=Path(__file__).resolve().parent.parent
sections=json.loads((root/'src/lib/content.json').read_text())
source=(root/'content-source.md').read_text()
assert '\n---\n'.join(sections)==source
export=html.unescape((root/'out/index.html').read_text())
export=re.sub(r'<[^>]+>',' ',export).replace('\\\\n',' ').replace('\\n',' ').replace('\\"','"')
def norm(s):return re.sub(r'\s|\*|[\[\]]','',s)
export=norm(export)
# The user supplied the real consultant identity and biography on 2026-10-28.
# These three source placeholders are fulfilled by that approved content.
resolved_bio_placeholders={norm(line.strip('[]')) for line in sections[8].split('## نتائج')[0].splitlines() if line.startswith('[')}
consultant=json.loads((root/'src/lib/consultant.json').read_text())
for value in consultant.values():assert norm(value) in export,value
missing=[];checked=0;resolved=0
for line in source.splitlines():
 line=re.sub(r'^#+ |^- |^\d+\. ','',line).strip()
 if len(line)<12 or line=='---':continue
 plain=re.sub(r'^\d\. ','',line.replace('**','').replace('*','').strip('[]'))
 if 'سياسة الخصوصية] |' in plain:
  for label in ['سياسة الخصوصية','وسائل التواصل','بيانات المنشأة']:assert norm(label) in export
  continue
 if norm(plain) in resolved_bio_placeholders:
  resolved+=1
  continue
 checked+=1
 if norm(plain) not in export:missing.append(plain)
assert not missing,missing
assert resolved==3,resolved
counts={'challenges':len(re.findall(r'^\*\*\d\. ',sections[1],re.M)),'pillars':len(re.findall(r'^### الركيزة',sections[3],re.M)),'phases':len(re.findall(r'^## المرحلة',sections[4],re.M)),'deliverables':len(re.findall(r'^### \d\. ',sections[5],re.M)),'bonuses':len(re.findall(r'^\*\*المكافأة',sections[6],re.M)),'differentiators':len(re.findall(r'^\*\*',sections[7],re.M)),'faqs':len(re.findall(r'^### ',sections[12],re.M))}
assert list(counts.values())==[6,4,4,9,5,6,12],counts
print(f'PASS: {checked} source text lines represented; {resolved} consultant placeholders fulfilled with user-approved biography; full original source retained verbatim; footer controls preserved.')
print(counts)
