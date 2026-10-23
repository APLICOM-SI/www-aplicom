---
naziv: "Prnwnd"
kratek_opis: "Izpis iz DOS programov na Windows in mrežne tiskalnike, PDF in pošiljanje po e-pošti."
kategorija: "Pripomočki"
verzija: "V3.2.23"
datum: "2026-10-16"
prenos: "https://www.aplicom.email/prenosi/prnwnd_setup_030223.exe"
spremembe: "/media/files/2026/10/16/novosti.txt"
slika: "/media/images/hero/13/med_med-prnwnd.png"
vrstni_red: 8
arhiv: false
---

Če ste pri svojem delu že naleteli na težavo, da vaš DOS program ne more pisati na tiskalnik, ker le-ta nima podpore za DOS, bodisi je priključen na USB izhodna vrata ali pa je to eden iz omrežnih tiskalnikov, potem lahko program **PRNWND** reši vaše težave.\
**Kako PRNWND deluje ?** \
PRNWND deluje v ozadju na lokalnem računalniku. Pri prvem startu program kreira devet delovnih map, ki služijo kot vhodno področje za izpise za devet različnih windows tiskalnikov. DOS programi MORAJO imeti poln dostop do teh direktorijev. Program delovne mape kreira v mapi C:\APLICOM\PRNWND\PRTDIR, lahko pa jo kasneje spremenite. Imena map so PRT1,PRT2 do PRT9. DOS program pošlje (kreira) izpisno datoteko v eno od map, program PRNWND jo prebere in jo pošlje na tiskalnik, ki je povezan s to mapo. Po izpisu PRNWND izpisno datoteko izbriše. V primeru, da povezava med delovno mapo in tiskalnikom ni posebej podana, program tiska na default tiskalnik.\
Če izpis vsebuje osnovne Epson ukazne sekvence, jih program ustrezno interpretira. PRNWND pozna naslednje ukazne sekvence:\
Carriage Return \
Form Feed \
Line Feed \
Select 1/8 inch spacing \
Select 1/6 inch spacing \
Select 10 cpi \
Select 12 cpi \
Select/Cancel Condensed Mode \
Turn Double-width Mode On/Off \
Select/Cancel Emhasized, Double Strike Mode \
Select/Cancel Italic Mode \
Select/Cancel Underline mode

in še dodatno

Landscape mode \
Izpis slike (WMF or BMP) \
Pošiljanje izpisa po E-pošti\
**Landscape mode**\
Če želite izpis v "landscape" obliki, mora prva vrstica izpisa vsebovati ukaz za Landscape. Prednastavljena vrednost je Esc + LAND, ki pa ga lahko seveda spremenite v PRNWND.ESC datoteki.\
**Izpis slik**\
Program omogoča izpis slik formata BMB in WMF. V izpis morate vključiti poseben ukaz GRAF. Sintaksa ukaza je naslednja:\
Esc + GRAF#datoteka#wh\
kjer je\
\# - omejilnik polnega imena datoteke - slike\
datoteka - polno ime BMP ali WMF datoteke\
w - širina slike (v črkah)\
h - višina slike (v vrsticah)\
Primer:\
chr(27)+'GRAF#c:\test\slika.wmf#'+chr(20)+chr(4)\
izpiše sliko c:\test\alika.wmf z dimenzijami (4 vrstice, 20 znakov) na trenutni poziciji. \
**Pošiljanje elektronske pošte**\
Najenostavnejši način za pošiljanje izpisa po elektronski pošti je ta, da v dodatnih nastavitvah tiskalnika označite možnost izpisa v RTF datoteko in označite Pošlji E-mail. Prav tako morate podati polno ime datoteke, ki jo program kreira in pošlje po e-mailu, n.pr. C:\TEMP\PRNWND.RTF.\
Program bo po končanem izpisu izpisano datoteko v RTF obliki kot prilogo poslal želenemu naslovniku. Naslovnika pošte lahko vnesete posebnem oknu, če pa označite v nastavitvah Sistemski dialog, to naredite v programih Outlook ali Outlook Express.\
V primeru, da želite izpis poslati po elektronski pošti točno določenemu prejemniku, lahko elektronski naslov prejemnika zapišete v posebni ukazni sekvenci z naslednjo sitakso ukaza:\
MAIL#e-mail#\
kjer je\
\# - omejilnik naslova elektronske pošte\
e-mail - naslov za elektronsko pošto\
Primer:\
chr(27)+'MAIL#info@aplicom.si#'\
Program tako zakodirani naslov uporabi samo v primeru, da imate tiskalnik v programu PRNWND nastavljen za izpis na e-pošto.\
**Izpis v RAW obliki**\
To obliko tiskanja izberite v primeru, da imate matrični tiskalnik nameščen bodisi na drugem računalniku kot omrežni tiskalnik ali pa je le-ta priključen na printer server. Program pri takem načinu tiskanja vhodne datoteke ne interpretira, pač pa jo samo prenese na izbrani tiskalnik.\
**Namestitev programa**\
Program instalirate tako, da poženete program SETUP.EXE. Po prvi instalaciji programa priporočamo, da ponovno zaženete računalnik. Instalacijski program namreč kreira spremenljivko okolja APLICOM_PRTDIR, ki jo računalnik nastavi šele po ponovnem zagonu (Windows 98, ME). V vaših programih lahko s pomočjo vrednosti te spremenljivke določite pot do delovnih direktorijev, v katerih kreirate izpisne programe.\
Pri prvem startu program kreira delovni direktorij z devetimi poddirektoriji. Prednastavljeno polno ime je C:\APLICOM\PRNWND\PRTDIR, ki pa ga lahko kasneje spremenite v nastavitvah. Po startu se program naseli v spodnji vrstici ekrana (Traybar). Takoj po nastavitvi lahko preverite delovanje programa tako, da po dvokliku na ikoni programa izberete Testni izpis in nato še tiskalnik št. 1. Program bo poslal testni izpis na default tiskalnik. Če je s testnim izpisom vse v redu, nadaljujte z nastavitvijo tiskalnikov.\
S klikom na desno tipko miške na ikoni lahko vstopite v nastavitev programa, v kateri lahko povežete delovne direktorije z ustreznimi tiskalniki. Vsak od tiskalnikov ima lahko poljubne nastavitve. Spreminjate lahko levi in desni rob izpisa, obliko šumnikov v izpisu (CP437, CP852), izhod za tiskanje (RTF) in zmožnost predogleda tiskanja. \
**Potrebne spremembe v DOS programih**\
Ob namestitvi programa program kreira spremenljivko okolja z imenom APLICOM_PRTDIR, ki kaže na mapo, v kateri se nahajajo delovne mape za vseh devet tiskalnikov (default: C:\APLICOM\PRNWND\PRTDIR). \
V DOS programu tako lahko na enostaven način dobite informacijo, kam naj program pošilja izpise: za tiskalnik 1 na 'APLICOM_PRTDIR'\PRT1, za tiskalnik 2 na 'APLICOM_PRTDIR'\PRT2 in tako naprej.\
Potem, ko izpisno datoteko kreirate na svojem delovnem področju, jo prepišite na delovno področje programa PRNWND.\
**Težave z antivirusnimi programi**\

Program PRNWND ob zagonu prebere podatke o vseh aktivnih tiskalnikih, zato morajo biti pred njegovim zagonom naloženi tudi vsi aktivni tiskalniški gonilniki. Ob zagonu računalnika antivirusni programi običajno pregledujejo vse programe in pripadajoče knjižnjice, ki se izvajajo ob zagonu. Pogosto se dogaja, da se zaradi tega gonilniki za tiskalnike naložijo prepozno (pred startom programa PRNWND), kar ima za posledico napake pri pisanju preko programa PRNWND. V takih primerih priporočamo povečanje zakasnitve starta programa v nastavitvah programa (prednastavljeno 15 sekund, priporočamo povečanje na 30-45 sekund).

**Registracija programa** \
Neregistrirana verzija na vsaki strani izpisa izpiše podatke o avtorju programa. V primeru, da imate izhod preusmerjen v RTF datoteko, pa izpiše samo prvo stran. \
Cena registracije programa znaša 45 EUR + DDV za delovno postajo. Razvijalci programske opreme, ki potrebujejo program PRNWND za svoje stranke, lahko sklenejo z nami poseben dogovor o nadaljnji prodaji programa.Registracijo programa lahko opravite telefonsko ali po elektronski pošti. Program registrirate tako, da z desno tipko kliknete na ikono programa in izberete Registracija. Program prikaže kodo, na osnovi katere vam lahko generiramo ključ za registracijo programa. Kodo nam lahko sporočite po telefonu ali po elektronski pošti. Po plačilu programa vam bomo poslali ključ, ki ga boste vnesli skupaj s tekstom lastnika programa. Po uspešni registraciji programa bo program na računalniku deloval brez omejitev.\
**Prenos testne verzije programa**\
Testno verzijo programa lahko prenesete iz našega strežnika tako, da kliknete na tekst **Prenosi** v zgornjem meniju in nato izberete prenos programa PRNWND.
