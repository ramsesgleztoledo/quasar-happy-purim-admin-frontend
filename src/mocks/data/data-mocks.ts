import type { LoginAccountInterface } from "../interfaces/mocks-interfaces";


const currentUrl = window.location.origin




const loginAccountsAux: LoginAccountInterface[] = [
  { id: 757, name: `Elana's School`, guid: 'E834CD68-3272-424B-9851-30EF830A4E98', token: "IIiteGH1xpeGKnVAoyDFxPX2jEwl9IfIJ5ltNUzaFuIC+4JNcdZfigaPWY1MzmNFvdH5OA3vXJXecEdxxRqiRg==" },
  { id: 783, name: `Test School`, guid: 'AB958CEA-5BFB-45E3-B3B5-60561B93A598', token: "5DOTr9y2QULoWpQEtGjADR/oAXOzr4RHIrS+kRNtZKATKESAt7/msjfBWBLC7R0tYX1I+rA+d89kU49m6bEP6Q==" },
  { id: 334, name: `Yeshiva Toras Chaim Toras Emes`, guid: '4103410A-7A61-4C42-A7A8-75DE0014F4D9', token: "+Q4V35+oGu9DzIMXSgG0gOX46yoiMc1lm9Rzka/+oFqtm3pATaCY6XKBAeWN86GT8JjwcUbuX9KDvOKb3qbpbQ==" },
  { id: 275, name: `Young Israel of Holliswood`, guid: '49B8697D-D609-4094-BC30-05C55F2E866B', token: "k4ZTeJqtLItIypSdN0od7eibNp2kg/IS1xeZSxZYXqzMl/4ZksOiJMrbBLTF/V5uFJ/YEX61AIkuPZNoLZjN5w==" },
  { id: 107, name: 'KJ - Kehilath Jeshurun', guid: '540EE815-6F63-4E50-B365-F867888C1664', token: "7h8b//ODayscR05gPc4PVhV+YXNTWKl2RfRoguF5h7gim7gcoT2PU8+0rXQ9LPTK0B+qr5AbmA1msp/74PWxQg==" },
  { id: 637, name: 'Beth Jacob High School', guid: '23AADF55-21CA-4CCE-8C6D-2AB50762BCB8', token: "r2Qr3BPMQxhznMdJzsXRlrHcMHL5tR0to6P4NgygY2mMpoI+OebpqoG3aaEin3yxTTbbH4EujqkUiqKijXxmuA==" },
  { id: 98, name: 'Hebrew Theological College', guid: 'A4B538C9-FC02-4FD1-830E-676C180045ED', token: "tRZURzMNoSY34iQpsiV3oOtICaA+r7SrfNlzKMKorstMX7XuIluX9O34EZJ/zuBh3tUg1Ka4n1BRAKwIqG2q5A==" },
  { id: 20, name: 'Sisterhood of Temple Emanuel of Pascack Valley', guid: '48E589E5-1704-4C63-A7DC-191F83A0C9CA', token: "tOAuRZqY9TgDNRldSnUHSNtgT3zvPc+wJpkrPuump1aRHCKf/LMWgVHqBIG8hxM/Ctn8SNjYY30/H0+KjH17Ig==" },
  { id: 1, name: 'Demo Synagogue', guid: 'E336934F-73FE-47D8-ABEA-E1507A02D6D7', token: "tdlArHFb9T4EFeBJbMxi1iQcAH7bDuXXczajNZWAdZactIPyQzPL5PS9KKnW4jkMe/rP5mGT85AEk9ii/AgPOw==" },
  { id: 332, name: 'CSAIR Sisterhood', guid: '4DBC0623-10FC-419A-A780-5200B3D7E9F4', token: "fXDvYsO0IOTkXgQgI5B9ENDSKYSezQNSTjSC8/OcEsD0wqcV+0WFmJBLuM7myAO4LFK719ZHrmQLn4OzZefaSg==" },
  { id: 665, name: 'Congregation Shaarei Tefillah', guid: '81EBBD69-C7B8-4C32-B399-133B0F7BE1A8', token: "9W1b462q0PGyTh3nho+6vWEXGWEETCL3xlMHc0xIy1o/Ft7YokPWVDDs8YwLSoRFZcYFWk35M2YIly536e+6Pw==" },
  { id: 352, name: 'AMIT - Gayl Shechter', guid: 'D4BAAF93-4464-47BC-A887-57893F92C03A', token: "71iSSNJHcwDIr2OwkmrQ5Jw5iw3ze85xZnQLdHkJANrzkK1dvmXbiTEDpbxxIzK79asSxVvfqaDRRtUtZfZzaQ==" },
  { id: 353, name: 'AMIT - Havtacha', guid: 'B2445634-4A95-4FFE-AA25-AFBE514FD898', token: "bIW6G+gdFmA1bq92kbuxVlxkj4bidx3g+PxqK+l1XklWZNzS44xhwTsh2zuLW0Y/EoqeJRZud+2gpK2zEFYoEg==" },
  { id: 16, name: 'Young Israel of Hollywood', guid: '41450B0B-2A8C-49D7-A83C-F7CB5D86712B', token: "wzUzMmHj6GTblD2UsyvghVmxGUwHbvRPyqW6cKghyG+S2WLHQedl8/zY7hzTMmJ+K1slDPvcpq3bJdXVhJkx9w==" },
  { id: 61, name: 'Congregation Adat Yeshurun', guid: '9D0570F1-609E-4A3E-A146-709B2395D0B6', token: "qQg0vUyln9RCkx6wtY9Envs1b5lZgjZi5ncN7osIPwDtB+ms3eImgnjTuN6OM/mXwEUk+/KoqJgaqDSE5/oATA==" },
  { id: 32, name: 'Temple Beth Sholom - Hamden', guid: 'C7F9C4B7-E7F6-4F1C-BE08-6A24FC3F5BB1', token: "/mIvwbh/xiDa4f2rgx07q0jyle55t+wf8co1qzhb6YDTTqCjePUz64Dv6rnx2BeE5H1mHeUV8sOSY1NmCv049g==" },
  { id: 17, name: 'Young Israel of Woodmere Sisterhood', guid: 'C7F9C4B7-E7F6-4F1C-BE08-6A24FC3F5BB1', token: "r2pqWPAFwuYY+h2T9DII1Dk7kyD3uskVmS0Qr65LqFoUbVkfiHvYh2vPZfj2dIO/auYYxy4K8BBPe6M+KZAs5g==" },
  { id: 212, name: 'Young Israel of White Plains', guid: '13942291-2D0B-4B4E-884A-5467A4C6D758', token: "TCAyswKDvm6WLuG2dm282fYSpBx0AV1s2R8h3HctC5OMUsCdXf5KvVkBYLaR8mNUbJ7EfOR79bKbmnfWxfjVRA==" },
  { id: 253, name: 'Temple Beth Shalom of Livingston', guid: '7E64CBCB-6EA9-4CC0-9A25-B0EB447B8316', token: "eWKalhMyARAYNpZYUDp6Y68j3puaa5kBIsvuNP0eRyGlHpyeCHRfb02Lmp0PKNh8AGkGehKfsd82+vgIBOfO7Q==" },
  { id: 30, name: 'Berman Hebrew Academy', guid: 'D87BC041-5CE0-4858-B73E-0AD9A77EF80E', token: "nX7jtgQcegy0AEQoygDV71TDAgsOKdfxWgxHx499YICI9kE/AEC3++UVqhf/BRJu5j68bngZpopNWC0DmrDLUg==" },
  { id: 77, name: 'Yeshiva Elementary School', guid: 'DFA1BBAD-D4A3-4E1E-B09B-47F16103511B', token: "djtahtcL4GpGpGoQzhiffKHs2OwONvn9XufcMZnChK56FtSHUe1mTh/LFqNngnvdmTvqwm5eguIb6aQANWYAkg==" },
  { id: 86, name: 'HAFTR', guid: 'D90A22DD-FB11-4A82-A4CE-83E331C3D57C', token: "R17j4eDDUKqHuCpzIU7rkualBJ96nctM8CdLRzOwO91DYRZNUF0UxSc6e5nhA3X81tvnrw5/QqQbda/MgbLdAQ==" },
  { id: 197, name: 'Cheder Menachem', guid: '8B1F18C5-EAF5-45DD-A6A5-7B2D64D9A775', token: "ypdepWo/yR8wO/GD9tICRKubls3jxRC9cYRex+YJqQl1MmDRKYpLGDv0SrtcqL9Z11VlriX+T/yir9tS92Q7RA==" },
  { id: 67, name: 'Epstein School', guid: 'F3790B8D-26F8-4EB2-97FA-A85CFE23F427', token: "/k6vFWGBkAdi5ye9jUBFWC26uBF/ubJccCk++DJQHbzJQ2TOAVTPpIDHPrnsvfq0PVUIGoAgR9IIr7EwCYU3qQ==" },
  { id: 249, name: 'Midway Jewish Center', guid: 'ABA59B52-484F-49C5-9D4C-2D02DDD5833A', token: "uXQj9Gob0BPmy4S6XemOJ/qdw9uYB0qPwELiRvVGKDwRMuoHHdpgd8NiobAaPSOl+WL/DNPbZpuXap7qMmb83Q==" },
  { id: 271, name: 'Chabad of Summerlin', guid: 'BADDF918-6EFF-4853-8161-9B9161F3FB51', token: "fnjuoyhjjruus+M8hPnRaIVp0+SIuB6jdL0yR2gHrj+HLPH6m+GvnTXvQ7ZH9eeZydEMcd4rM/I+/W0y0nAFWg==" },
  { id: 22, name: 'Chabad of Summerlin', guid: 'BADDF918-6EFF-4853-8161-9B9161F3FB51', token: "fnjuoyhjjruus+M8hPnRaIVp0+SIuB6jdL0yR2gHrj+HLPH6m+GvnTXvQ7ZH9eeZydEMcd4rM/I+/W0y0nAFWg==" },
  { id: 329, name: 'HDS Ann Arbor', guid: '4C103A7C-293D-4E58-A01A-65C93A5C25AE', token: "R/yjLJiddZdjqpIAktHa5z9SGPwIZXULsqvYjixxXpocvDMKocx6ljpM7KZIOG6kA30B1iUa48b9eruTeUfq1A==" },
  { id: 394, name: 'Chabad House Stamford', guid: '99C9F8BC-3A2C-4562-B4BF-174573A9C787', token: "iEjKptZ12SYVp0EJByGK8p5wtAkFhvj+8ewKE7l/MlQ/Yw61ZaxqbQobHZwrgAzU9X8vTbEhq49mpxmwKxO4pQ==" },
  { id: 423, name: 'Golda Och Academy', guid: '0492E804-FCAC-463C-960B-73B3598BF4E8', token: "c0dTFbsMJe4TudRZj8P6CtgUHBOv3+ybsYY97AX/V99uRk8mQBfaVPU1FE8uCVLBgh/lFoQUk/UE87Svf0sDfw==" },
  { id: 633, name: 'Hochberg Lower School', guid: 'FE796C34-07C3-4498-8CDC-F9E1B7C0F609', token: "pKJcI0JZYMyfJ318NbCiV2dGY5jUpqjIUS8krrAUl/AJ9zfYvnu7a6s1eP/0bP/XTFon9yImuJaHc4CpsMZYsw==" },
  { id: 445, name: 'Shalhevet High School', guid: '3F774D53-0326-4B22-9ADD-42737417995F', token: "XPwOLb4t6bSJyGNE4WtrWed8EegFBog1OnGlxU6JwtmpM6eJVnhBC0HKhQJTrsXT0hT2vhfcTbpirzsAvfDk1g==" },
  { id: 446, name: 'Independent Jewish Day School (IJDS)', guid: '163F8F46-BC46-40F2-B83E-26B2520CB876', token: "gwmCq1ffavyOT21tuzcN3Gtg+TvwuoaMNAefkiuQyGd80eQSNOJ1+QDRNDLQkR892PLbPlk9LBfPKGEE1SMGTg==" },
  { id: 471, name: 'North Shore Hebrew Academy PTA', guid: 'B3D7EF26-6B4A-4A98-826D-1A23DE0D050F', token: "eTryU7xplW60WcVqu2//UbWqNBARWZ9EdaI0oUBlVz3Fv+SBic1IzMR+UIcDxGckgtQz1cTm3tvnHkLn8pGpiQ==" },
  { id: 530, name: 'Etz Chaim Sisterhood', guid: 'B6CDC14C-0CBD-4834-ACC9-9E09A2562F44', token: "13I4MHCSPm/9JZS1iQQ6ox7jRiAAfx2COg09wFxszH6IuwUdMvsID2EXw6H21Qi2HpAh5FoITusaR0NI6SMm4Q==" },
  { id: 680, name: 'Tifereth Israel Synagogue', guid: 'A16564BF-B7EE-421C-98DE-B95E3F01E642', token: "oQoX72F2p0tr/001KIQSE/EDl4HRaPkNkQMsiLD8ualHzT2cz2IAXVXdm2uyZGIwRuS1PMb3aoYsppbgCDcMGQ==" },
  { id: 730, name: 'Young Israel West Hempstead Sisterhood', guid: 'E88CC06F-02E3-469B-8F3F-4B932FBE23F1', token: "T5EtSIFrFMNfWxSA/MC6+p2GvYRJNwVd4MHux2cMM/KNffJLaDXtCNNn63+fj98BynlZlAT8EETxNdeMN56ZdA==" },
  { id: 647, name: 'Young Israel of Brookline', guid: 'E4E6D638-D909-4611-A435-5E283F0E65D6', token: "7cfQ1uW8sX444N3dDLfLOOZ38UyjFM45XHKkzC61SqdJcEmXzDY1TZFHz6+Xd57xv1o5N/uujzaXtxzreJT5Ng==" },
  { id: 469, name: 'Congregation Beth Israel of Bellingham', guid: '0492d264-e946-42fb-bb65-500e69df4bd8', token: "R15VNK7Ky6eLijRoen7/J2swZDwfEQ+or4BOLCzF/CKWjewDasEGeJensNtGPXXWnclUGYt0tlh9bAIPM7twgg==" },
  { id: 600, name: 'Har Shalom Sisterhood', guid: 'A85CF7CE-20D2-4B3F-9054-063C178CF041', token: "7Ncinx/xjKry1+R6EaG4rN7U4ZtefPooCFwbfP6EF8nXytcMFblNQJmlMXEIalCCTzQY6bwstMCeZxCOdtfnug==" },
  { id: 571, name: 'Talmudical Academy', guid: '027CC232-5518-482D-AAF3-CE4C34104562', token: "o3giiVX+76RJLFaCQYf1tmgCFctb0cs8grF29RZiHn8RzusQhtdkcXf3rYO/RFam9h0z8Q9NDg/kOB8HhAdLCA==" },
  { id: 379, name: '', guid: 'FD30E5F5-9E95-43C6-8274-1B5836E9F917', token: "cxllKoeyEwMnI9+L9GN8aQJDiF20eDKA5i2UdK18+VESag5fUcx8fr7zqoC06WvDVYCEWYtwhp+yI5EYMrevpg==" },
  {
    id: 508, name: 'Sacks Morasha JPS', guid: 'C545756A-37C0-4D62-8905-5F9DFBF0782A', token: "bHqH78BN14BEMj472KZwxOWthZdvnevxr5j+kOirCkX+85E9kkoE47J3RzCG+6QlowAsf9+LCnskAsouJUen2Q=="
  },
  {
    id: 23, name: `Congregation B'nai Tzedek(CBT)`, guid: '5F8805BE-4F17-458D-B69E-3C823EC2DA90', token: "5zWEjpvWruB2F0p//FwZPtRwcxo2AOY8yiJvqTuc9BqH2z5i2Cs34lD3cL/qwR10nZbCTC+MUQlBtJy5vIhFRA=="
  },
  {
    id: 363, name: `Anshe Sfard Kehillat Torah (ASKT)`, guid: '7169DB3C-424B-4531-ADF7-5467422E51ED', token: "9qNQCwNPZouweincx34KZnK3GBc0Lib9cfqcgPXKXwzNElTZelsp69ntE3ZgVsJGcOF24CFMIBlVtan//LAyQw=="
  },
  {
    id: 577, name: `Adath Israel Congregation - Adath Israel Women's League`, guid: 'F01B87E2-F516-4336-B705-D1DBC0F77098', token: "ykeWZ16sl5MsUL0tgEyMYTSYKa/90gTXkDAree+cNJoskYBSs+ESDa3AHGIlxwhmW7HvifVoXteuyHCXPngnZg=="
  },
  {
    id: 686, name: `Beth El Synagogue (St. Louis Park)`, guid: '37F4F3A7-56FD-424A-B460-F591E7AA61F4', token: "H40n7tPBZQZhwKNHm3F4eb+XKJiGp0BTUc5fIi2aK/0zvp4Fp9gYH1VU7dEJltwGNc8m+yKJB12SrlYRlJ0gqw=="
  },
  {
    id: 163, name: `Young Israel of Kendall Sisterhood (YIK)`, guid: 'D3A5104D-2391-4EA3-8194-3C881840703E', token: "A2fquqZsvBQHD6Mn8lBu47DbhPAacnEpC5j6G4nwMUyvr/Hm6b1Pvra0Ih/xDsGDbYUVrDYd5Mh5egf59rCnow=="
  },
  {
    id: 116, name: `West End Synagogue Sisterhood`, guid: '6653D232-1050-4F26-8EDF-709392DAD96C', token: "z7jrl9Hb5s+xQeuFnJTXqsGlWrpEcbCAl480P9qyEkLqOVVJEzJX5A5vA10NpAviPPs5rpOmcmeom+OnhpoFrg=="
  },
  {
    id: 786, name: `Congregation Ahavas Sholom`, guid: 'B16982FE-980F-40F4-9E48-985D39DD647F', token: "JX/Chqw8cvN7Q2XOKNQtVWq/TAWhlgnhX+B23ESLAGddYqqmk1e+w5zU1bN5qR5lxOFclIIVX1aVOpFNuGUcKw=="
  },
]

export const loginAccounts: LoginAccountInterface[] = loginAccountsAux.map(ac => ({
  ...ac,
  url: `${currentUrl}/#/authenticate?token=${ac.token}`
}))


