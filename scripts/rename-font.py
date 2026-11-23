"""Rename the modified Adobe font before distributing its web subset."""

from io import BytesIO
from sys import stdin, stdout

from fontTools.ttLib import TTFont


font = TTFont(BytesIO(stdin.buffer.read()))
family_name_ids = {1, 3, 4, 6, 16, 18, 20, 21, 25}
for record in font["name"].names:
    if record.nameID in family_name_ids or record.nameID >= 256:
        original = record.toUnicode()
        if "Source" in original:
            record.string = original.replace("Source", "Doyoga").encode(record.getEncoding())

font.save(stdout.buffer)
