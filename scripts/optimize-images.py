from pathlib import Path
from PIL import Image

directory = Path(__file__).resolve().parents[1] / 'assets' / 'images'
conversions = {
    'DostTeknik_Logo_Yeni.jpg': 'dost-teknik-logo.webp',
    'DostTeknik_Disari.jpeg': 'dost-teknik-isletme-dis.webp',
    'DostTeknik_iceri.jpeg': 'dost-teknik-isletme-ici.webp',
}
for source, destination in conversions.items():
    with Image.open(directory / source) as image:
        image.save(directory / destination, 'WEBP', quality=84, method=6)
