"use strict";
// -------------------------- ------------------- BEGINNING OF TEST 1-------------------------------------------------

export const keywords = [
  {
    id: 1,
    title: "Kugirango berekane ahantu habi cyane, hakoreshwa ikihe kimenyetso?",
    options: [
      "Hakoreshwa ikimenyetso k’itara ry’umuhondo rimyatsa.",
      "Hakoreshwa ikimenyetso k’itara ry’umutuku.",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    title: "Utugarura rumuri tuba duteye dute?",
    options: [
      "Imbere: Umweru.",
      "Inyuma: Umutuku.",
      "Utwo mu mbavu: Umuhondo cg icunga rihishije.",
      "Ibisubizo byose nibyo.",
    ],
    correctAnswer: 3,
  },

  {
    id: 3,
    title: "isangano bivuga:",
    options: [
      "ahantu hose imihanda ihurira",
      "aho umuhanda urasukira mu wundi cyangwa mu maharakubiri y'inzira nyabagendwa",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 4,
    title: "Urusisiro bivuga:",
    options: [
      "ahantu hose imihanda ihurira",
      "ahantu hose hari amazu yegeranye cyangwa afatanye, ari ku ruhande urwo arirwo rwose rw'inzira nyabagendwa cyangwa se aho binjirira n'aho basohokera hagaragazwa n'ibyapa by'aho hantu;",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  {
    id: 5,
    title: "Ikinyamitende bivuga ikinyabiziga cyose:",
    options: [
      "nk'igare ry'ikiziga kimwe.",
      "ry'ibiziga bibiri, bitatu cyangwa bine, kigendeshwa n'ingufu z'abantu bakiriho nko kuba bakoresha ibirenge cyangwa intoki.",
      "A na B ni ibisubizo by’ukuri.",
      "Nta gisubizo cy’ukuri kirimo.",
    ],
    correctAnswer: 2,
  },

  {
    id: 6,
    title: "Romoruki:",
    options: [
      "bivuga ikinyabiziga kigenewe gukururu ikindi.",
      "bivuga ikinyabiziga cy'ibiziga bine.",
      "bivuga ikinyabiziga cy'ibiziga bitatu.",
      "bivuga ikinyabiziga kigenewe gukururwa n'ikindi.",
    ],
    correctAnswer: 3,
  },

  {
    id: 7,
    title: "guhagarara umwanya muto bivuga:",
    options: [
      "igihe cya ngombwa ikinyabiziga kimara gihagaze kugirango abantu cyangwa ibintu byinjire cyangwa bisohoke.",
      "ighe ikinyabiziga gihagaze iminota iri hagati 10 na 15.",
      "ighe ikinyabiziga gihagaze amasaha ari 1 na 2.",
      "Ntagisubizo cy'ukuri kirimo.",
    ],
    correctAnswer: 0,
  },

  {
    id: 8,
    title: "guhagarara umwanya munini bivuga:",
    options: [
      "igihe cya ngombwa ikinyabiziga kimara gihagaze kugirango abantu cyangwa ibintu byinjire cyangwa bisohoke.",
      "igihe kirenze icya ngombwa ikinyabiziga kimara gihagaze kugira ngo abantu cyangwa ibintu byinjire cyangwa bisohoke.",
      "he ikinyabiziga gihagaze iminota iri hagati 10 na 15.",
      "Ibisubizo byose nibyo.",
    ],
    correctAnswer: 1,
  },

  {
    id: 9,
    title: "itara ndanga-cyerekezo cyangwa ikinyoteri bivuga:",
    options: [
      "itara ry'imbere mu modoka ryeka umuyobozi aho agomba kunyura.",
      "itara ry'ikinyabiziga rigenewe kwereka abandi bagenzi ko umuyobozi ashaka kugana iburyo cyangwa ibumoso.",
      "A na B  nibisubizo by'ukuri.",
      "Ntagisubizo cy'ukuri kirimo.",
    ],
    correctAnswer: 1,
  },

  {
    id: 10,
    title: "ikinyabiziga - ndakumirwa:",
    options: [
      "ni ibinyabiziga by'abapolisi.",
      "ibizimya-nkongi.",
      "'ibinyabiziga bitwara abarwayi.",
      "Ibisubizo byose nibyo.",
    ],
    correctAnswer: 3,
  },
];

export const checkTest = [
  {
    id: 1,
    title: "Ikinyabiziga cyose cyangwa ibinyabiziga bigenda bigomba kugira:",
    options: [
      "Umuyobozi",
      "Umuherekeza",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 2,
    title:
      "Ijambo “akayira” bivuga inzira nyabagendwa ifunganye yagenewe gusa:",
    options: [
      "Abanyamaguru",
      "Ibinyabiziga bigendera ku biziga bibiri",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 3,
    title:
      "Umurongo uciyemo uduce umenyesha ahegereye umurongo ushobora kuzuzwa n’uturanga gukata tw’ibara ryera utwo turanga cyerekezo tumenyesha :",
    options: [
      "Igisate cy’umuhanda abayobozi bagomba gukurikira",
      "Ahegereye umurongo ukomeje",
      "Igabanurwa ry’umubare w’ibisate by’umuhanda mu cyerekezo bajyamo",
      "A na C nibyo",
    ],
    correctAnswer: 2,
  },

  {
    id: 4,
    title:
      "Ahantu ho kugendera mu muhanda herekanwa n’ibimenyetso bimurika ibinyabiziga ntibishobora kuhagenda :",
    options: [
      "Biteganye",
      "Ku murongo umwe",
      "A na B nibyo",
      " Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 5,
    title:
      "Ubugari bwa romoruki ikuruwe n’ikinyamitende itatu ntibugomba kurenza ibipimo bikurikira:",
    options: ["cm75", "cm125", "cm265", "Nta gisubizo cy’ukuri"],
    correctAnswer: 3,
  },

  {
    id: 6,
    title:
      "Uburebure bw’ibinyabiziga bikurikira ntibugomba kurenga metero 11 :",
    options: [
      "Ibifite umutambiko umwe uhuza imipira",
      "Ibifite imitambiko ibiri ikurikiranye mu bugari bwayo",
      "Makuzungu",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 3,
  },

  {
    id: 7,
    title: "Ikinyabiziga kibujijwe guhagarara akanya kanini aha hakurikira :",
    options: [
      "Ahatarengeje  metero 1 imbere cyangwa inyuma y’ikinyabiziga gihagaze akanya gato cyangwa kanini.",
      "Ahantu hari ibimenyetso bibuza byabugenewe.",
      "Aho abanyamaguru banyura mu muhanda ngo bakikire inkomyi.",
      "Ibisubizo byose nibyo.",
    ],
    correctAnswer: 3,
  },

  {
    id: 281,
    title:
      "Niki wakora mugihe usanze mu bimenyetso bimurika harimo ibara ry’umuhondo:",
    img: "/image/215.png",
    options: [
      "Kongera umuvuduko",
      "Kugumana umuvuduko wari uriho",
      "Kwitegura guhagarara",
      "Gufata feri cyane",
    ],
    correctAnswer: 2,
  },

  {
    id: 282,
    title: "Iki cyapa cyivuga iki?",
    img: "/image/229.png",
    options: [
      "Umuvuduko ntarengwa 30 km/h",
      "Iherezo ry’umuvuduko  muke ntarengwa utegetswe",
      "Iherezo ry’Umuvuduko muto utegetswe",
      "Umuvuduko uri hejuru 30 km/h",
    ],
    correctAnswer: 1,
  },

  {
    id: 283,
    title: "Icyapa gikurikira  kivuze iki?",
    img: "/image/230.png",
    options: [
      "Ntihanyurwa",
      "Birabujijwe guhagarara umwanya munini",
      "Umuvuduko utarengeje",
      "Inzira yabanyeshuli",
    ],
    correctAnswer: 1,
  },

  {
    id: 284,
    title:
      "Inzira nyabagendwa ifite ibyerekezo  bibiri, uruhande rw’ibumoso rudufasha iki?",
    img: "/image/231.png",
    options: [
      "Kunyuranaho gusa,  ntugaruke  iburyo bwawe",
      "Kunyuranaho cyangwa ugakatira ibumoso",
      "Hemerewe kugenda imodoka zihuta gusa",
      "Gukatira iburyo gusa utanyuranyeho",
    ],
    correctAnswer: 1,
  },
];

export const Test = [
  {
    id: 1,
    title: "Ikinyabiziga cyose cyangwa ibinyabiziga bigenda bigomba kugira:",
    options: [
      "Umuyobozi",
      "Umuherekeza",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 2,
    title:
      "Ijambo “akayira” bivuga inzira nyabagendwa ifunganye yagenewe gusa:",
    options: [
      "Abanyamaguru",
      "Ibinyabiziga bigendera ku biziga bibiri",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 3,
    title:
      "Umurongo uciyemo uduce umenyesha ahegereye umurongo ushobora kuzuzwa n’uturanga gukata tw’ibara ryera utwo turanga cyerekezo tumenyesha :",
    options: [
      "Igisate cy’umuhanda abayobozi bagomba gukurikira",
      "Ahegereye umurongo ukomeje",
      "Igabanurwa ry’umubare w’ibisate by’umuhanda mu cyerekezo bajyamo",
      "A na C nibyo",
    ],
    correctAnswer: 2,
  },

  {
    id: 4,
    title:
      "Ahantu ho kugendera mu muhanda herekanwa n’ibimenyetso bimurika ibinyabiziga ntibishobora kuhagenda :",
    options: [
      "Biteganye",
      "Ku murongo umwe",
      "A na B nibyo",
      " Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 5,
    title:
      "Ubugari bwa romoruki ikuruwe n’ikinyamitende itatu ntibugomba kurenza ibipimo bikurikira:",
    options: ["cm75", "cm125", "cm265", "Nta gisubizo cy’ukuri"],
    correctAnswer: 3,
  },

  {
    id: 6,
    title:
      "Uburebure bw’ibinyabiziga bikurikira ntibugomba kurenga metero 11 :",
    options: [
      "Ibifite umutambiko umwe uhuza imipira",
      "Ibifite imitambiko ibiri ikurikiranye mu bugari bwayo",
      "Makuzungu",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 3,
  },

  {
    id: 7,
    title: "Ikinyabiziga kibujijwe guhagarara akanya kanini aha hakurikira :",
    options: [
      "Ahatarengeje  metero 1 imbere cyangwa inyuma y’ikinyabiziga gihagaze akanya gato cyangwa kanini",
      "Ahantu hari ibimenyetso bibuza byabugenewe",
      "Aho abanyamaguru banyura mu muhanda ngo bakikire inkomyi",
      "Ibisubizo byose nibyo",
    ],
    correctAnswer: 3,
  },

  {
    id: 8,
    title: "Kunyuranaho bikorerwa:",
    options: [
      "Mu ruhande rw’iburyo gusa",
      "Igihe cyose ni ibumoso",
      "Iburyo iyo unyura ku nyamaswa",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 9,
    title:
      "Icyapa cyerekana umuvuduko ntarengwa ikinyabiziga kitagomba kurenza gishyirwa gusa ku binyabiziga bifite uburemere ntarengwa bukurikira:",
    options: [
      "Burenga toni 1",
      "Burenga toni 2",
      "Burenga toni 24",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 10,
    title: "Ahatari mu nsisiro umuvuduko ntarengwa mu isaha wa velomoteri ni:",
    options: ["Km50", "Km40", "Km30", "Nta gisubizo cy’ukuri"],
    correctAnswer: 0,
  },

  {
    id: 11,
    title:
      "Umuyobozi ugenda mu muhanda igihe ubugari bwawo budatuma anyuranaho nta nkomyi ashobora kunyura mu kayira k’abanyamaguru ariko amaze kureba ibi bikurikira:",
    options: [
      "Umuvuduko w’abanyamaguru",
      "Ubugari bw’umuhanda",
      "Umubare w’abanyamaguru",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 12,
    title:
      "Ku byerekeye kwerekana ibinyabiziga n’ukumurika kwabyo ndetse no kwerekana ihindura ry’ibyerekezo byabyo. Birabujijwe gukora andi matara cyangwa utugarurarumuri uretse ibitegetswe ariko ntibireba amatara akurikira:",
    options: [
      "Amatara ndanga",
      "Amatara ari imbere mu modoka",
      "Amatara ndangaburambarare",
      "Ibisubizo byose nibyo",
    ],
    correctAnswer: 1,
  },

  {
    id: 13,
    title:
      "Iyo nta mategeko awugabanya by’umwihariko umuvuduko ntarengwa w’amapikipiki mu isaha ni:",
    options: ["Km25", "Km70", "Km40", "Nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 3,
  },

  {
    id: 14,
    title:
      "Uburyo bukoreshwa kugirango ikinyabiziga kigende gahoro igihe feri idakora neza babwita:",
    options: [
      "Feri y’urugendo",
      "Feri yo guhagarara umwanya munini",
      "Feri yo gutabara",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 15,
    title: "Nibura ikinyabiziga gitegetswe kugira uduhanagurakirahure tungahe:",
    options: ["2", "3", "1", "Nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 2,
  },

  {
    id: 16,
    title: "Amatara maremare y’ikinyabiziga agomba kuzimwa mu bihe bikurikira:",
    options: [
      "Iyo umuhanda umurikiye umuyobozi abasha kureba muri metero 20",
      "Iyo ikinyabiziga kigiye kubisikana n’ibindi",
      "Iyo ari mu nsisiro",
      "Ibisubizo byose ni ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 17,
    title:
      "Ikinyabiziga ntigishobora kugira amatara arenga abiri y’ubwoko bumwe keretse kubyerekeye amatara akurikira:",
    options: [
      "Itara ndangamubyimba",
      "Itara ryerekana icyerekezo",
      "Itara ndangaburumbarare",
      "Ibisubizo byose ni ukuri",
    ],
    correctAnswer: 3,
  },

  // -------------------------- ------------------- BEGINNING OF TEST 2-------------------------------------------------

  {
    id: 18,
    title:
      "Za otobisi zagenewe gutwara abanyeshuri zishobora gushyirwaho amatara abiri asa n’icunga rihishije amyasa kugirango yerekane ko zihagaze no kwerekana ko bagomba kwitonda, ayo matara ashyirwaho ku buryo bukurikira",
    options: [
      "Amatara abiri ashyirwa inyuma",
      "Amatara abiri ashyirwa imbere",
      "Rimwe rishyirwa imbere irindi inyuma",
      "b na c ni ibisubizo by’ukuri",
    ],
    correctAnswer: 2,
  },

  {
    id: 19,
    title:
      "Itara ryo guhagarara ry’ibara ritukura rigomba kugaragara igihe ijuru rikeye nibura mu ntera ikurikira",
    options: [
      "Metero 100 ku manywa na metero 20 mu ijoro",
      "Metero 150 ku manywa na metero50 mu ijoro",
      "Metero 200 ku manywa na metero100 mu ijoro",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 20,
    title:
      "Iyo umuvuduko w’ibinyabiziga bidapakiye ushobora kurenga km50 mu isaha ahategamye, bigomba kuba bifite ibikoresho by’ihoni byumvikanira mu ntera",
    options: ["Metero 100", "Metero 200", "Metero 50", "Metero 150"],
    correctAnswer: 2,
  },

  {
    id: 21,
    title:
      "Birabujijwe kugenza ibinyabiziga bigendeshwa na moteri naza romoruki zikururwa nabyo, iyo ibiziga byambaye inziga zidahagwa cyangwa inziga zikururuka zifite umubyimba uri hasi ya cm 4.  Ariko ibyo ntibikurikizwa kubinyabiziga bikurikira",
    options: [
      "Ku binyabiziga by’ingabo bijya ahatarenga km25",
      "Ibinyabiziga bihinga",
      "Ibinyabiziga bya police",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 22,
    title:
      "Igice cyinzira nyabagendwa kigarukira ku mirongo ibiri yera icagaguye ibangikanye kandi gifite ubugari budahagije kugira ngo imodoka zitambuke neza, kiba ari",
    options: [
      "Ahanyurwa n’amagare na velomoteri",
      "Ahanyurwa n’ingorofani",
      "Ahanyurwa n’ibinyamitende",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 23,
    title:
      "Ubugari bwa romoruki ntiburenza ubugari bw’ikinyabiziga kiyikurura iyo ikuruwe n’ibinyabiziga bikurikira",
    options: [
      "Igare",
      "Velomoteri",
      "Ipikipiki ifite akanyabiziga kometse kuruhande rwayo",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 24,
    title:
      "Iyo hatarimo indi myanya birabujijwe gutwara ku ntebe y’imbere y’imodoka abana badafite imyaka:",
    options: [
      "Imyaka 10",
      "Imyaka 12",
      "Imyaka 7",
      "Ntagisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  {
    id: 25,
    title:
      "Icyapa kivuga gutambuka mbere y’ibinyabiziga biturutse imbere gifite amabara akurikira:",
    options: [
      "Ubuso ni umweru",
      "Ikirango ni umutuku n’umukara",
      "Ikirango ni umweru n’umukara",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 26,
    title:
      "Ni ryari itegeko  rigenga gutambuka mbere kw’iburyo rikurikizwa mu masangano:",
    options: [
      "Iyo nta cyapa cyo gutambuka mbere gihari",
      "Iyo ikimenyetso kimurika cyagenewe ibinyabiziga kidakora",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 2,
  },

  {
    id: 27,
    title:
      "Ibimenyetso bimurika byerekana uburyo bwo kugendera mu muhanda kw'ibinyabiziga bishyirwa iburyo bw'umuhanda. Ariko bishobora no gushyirwa ibumoso cyangwa hejuru y’umuhanda:",
    options: [
      "Hakurikijwe icyerekezo abagenzi bireba baganamo",
      "Hakurikijwe icyo ibyo bimenyetso bigamije kwerekana",
      "Kugirango birusheho kugaragara neza",
      "Ibisubizo byose ni ukuri",
    ],
    correctAnswer: 2,
  },

  {
    id: 281,
    title:
      "Ubugari bwa romoruki ikuruwe n’igare cyangwa velomoteri ntiburenza ibipimo bikurikira:",
    options: ["cm 25", "cm 125", "cm 45", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 3,
  },

  {
    id: 28,
    title:
      "Iyo itara ry’umuhondo rimyatsa rikoreshejwe mu masangano y’amayira ahwanyije agaciro rishyirwa ahagana he:",
    options: [
      "Kuri buri nzira",
      "Hagati y’amasangano",
      "Iburyo bw’amasangano",
      "a na b ni ibisubizo by’ ukuri",
    ],
    correctAnswer: 3,
  },

  {
    id: 29,
    title:
      "Inkombe z’inzira nyabagendwa cyangwa z’umuhanda zishobora kugaragazwa n’ibikoresho ngarurarumuri. Ibyo bikoresho bigomba gushyirwaho ku buryo abagenzi babibona :",
    options: [
      "Babona gusa ibumoso bwabo iby’ibara ritukura",
      "Iburyo babona iby’ibara risa n’icunga rihishije gusa",
      "Babona iby’ibara ry’umuhondo ibumoso",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 30,
    title:
      "Ibinyabiziga bikurikira bigomba gukorerwa isuzumwa rimwe mu mezi 6:",
    options: [
      "Ibinyabiziga bitwara abagenzi muri rusange",
      "Ibinyabiziga bigenewe gutwara ibintu birengeje toni 3.5",
      "Ibinyabiziga bigenewe kwigisha gutwara",
      "Ibisubizo byose ni ukuri",
    ],
    correctAnswer: 3,
  },

  {
    id: 31,
    title:
      "Iyo kuyobya umuhanda ari ngombwa bigaragazwa kuva aho uhera no kuburebure bwawo n’icyapa gifite ubuso bw’amabara akurikira:",
    options: ["Ubururu", "Umweru", "Umutuku", "Nta gisubizo cy’ukuri"],
    correctAnswer: 0,
  },

  {
    id: 32,
    title: "Ku mihanda ibyapa bikurikira bigomba kugaragazwa ku buryo bumwe:",
    options: [
      "Ibyapa biyobora n’ibitegeka",
      "Ibyapa biburira n’ibitegeka",
      "Ibyapa bibuza n’ibitegeka",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 33,
    title:
      "Ni iyihe feri ituma imodoka igenda buhoro kandi igahagarara ku buryo bwizewe bubangutse kandi nyabwo, uko imodoka yaba yikoreye kose yaba igeze ahacuramye cyangwa ahaterera:",
    options: [
      "Feri y’urugendo",
      "Feri yo gutabara",
      "Feri yo guhagarara umwanya munini",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 34,
    title:
      "Ibizirikisho by’iminyururu cyangwa by’insinga kimwe n’ibindi by’ingoboka bikoreshwa gusa igihe nta kundi umuntu yabigenza kandi nta kindi bigiriwe uretse gusa kugirango ikinyabiziga kigere aho kigomba gukorerwa kandi nturenze na rimwe km 20 mu isaha, ibyo bizirikisho bigaragazwa ku buryo bukurikira:",
    options: [
      "Agatambaro gatukura kuri cm 50 z’umuhanda",
      "Ikimenyetso cy’itara risa n’icunga rihishije",
      "Icyapa cyera cya mpande enye zingana gifite cm 20 kuri buri ruhande",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 35,
    title:
      "Uretse mu mujyi, ku yindi mihanda yajyenwe na minisitiri ushinzwe gutwara abantu n’ibintu, uburemere ntarengwa ku binyabiziga bifite imitambiko itatu cyangwa irenga hatarimo makuzungu ni :",
    options: ["Toni 10", "Toni 12", "Toni 16", "Toni 24"],
    correctAnswer: 2,
  },

  {
    id: 36,
    title:
      "Ubugari bw’imizigo yikorewe n’ibinyamitende itatu n’ubwiyikorewe n’ibinyamitende 4 bifite cyangwa bidafite moteri kimwe n’ubw’iyikorewe na romuruki zikuruwe n’ibyo binyabiziga ntibushobora kurenga ibipimo bikurikira:",
    options: [
      "cm 30 ku bugari bw’icyo kinyabiziga kidapakiye",
      "Ubugari ntarengwa budakuka ni metero 2 na sentimetero 50",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 37,
    title:
      "Kunyura ku binyabiziga bindi, uretse icy’ibiziga bibiri, bibujijwe aha hakurikira:",
    options: [
      "Hafi y’iteme iyo hari umuhanda ufunganye",
      "Hafi y’aho abanyamaguru banyura",
      "Hafi y’ibice by’umuhanda bimeze nabi",
      "Ibi bisubizo byose ni ukuri",
    ],
    correctAnswer: 3,
  },

  // {
  //     title: "Iki cyapa gisobanura iki?",
  //     img: "./image/247.png",
  //     options:
  //         [
  //             "Uguhinguka ku mwaro cyangwa ku nkombe cyangwa ahegereye icyome",
  //             "Inzira nyabagendwa iri kumusozi ucuramye",
  //             "Umuhanda utaringaniye",
  //             "Umuhanda wangijwe n’isuri"
  //         ],
  //     correctAnswer: 0
  // },

  // {
  //     title: "Iki cyapa gisobanura iki?",
  //     img: "./image/248.png",
  //     options:
  //         [
  //             "Hanyurwa na velomoteri gusa",
  //             "Nta modoka",
  //             "Hanyurwa nimodoka gusa",
  //             "Ntihanyurwa n’amapikipiki"
  //         ],
  //     correctAnswer: 3
  // },

  // {
  //     title: "Iki cyapa gisobanura iki?",
  //     img: "./image/250.png",
  //     options:
  //         [
  //             "Ahegereye amasangano y’inzira nyabagendwa n’inzira ya gari ya moshi ibambiye",
  //             "Inzira ibambiye imbere",
  //             "Inzira itabambiye itanafunze",
  //             "Imbere hari ikiraro  cy’amatungo"
  //         ],
  //     correctAnswer: 0
  // },

  // -------------------------- ------------------- BEGINNING OF TEST 3-------------------------------------------------

  {
    id: 38,
    title:
      "Iyo nta mategeko awugabanya by’umwihariko, umuvuduko ntarengwa ku modoka zitwara abagenzi mu buryo bwa rusange ni:",
    options: [
      "Km 60 mu isaha",
      "Km 40 mu isaha",
      "Km 25 mu isaha",
      "Km20 mu isaha",
    ],
    correctAnswer: 0,
  },

  {
    id: 39,
    title:
      "Iyo nta mategeko awugabanya by’umwihariko, umuvuduko ntarengwa ku modoka zikoreshwa nk’amavatiri y’ifasi cyangwa amatagisi zifite uburemere bwemewe butarenga kilogarama 3500 ni:",
    options: [
      "Km 60 mu isaha",
      "Km 40 mu isaha",
      "Km 75 mu isaha",
      "Km20 mu isaha",
    ],
    correctAnswer: 2,
  },

  {
    id: 40,
    title: "Ikinyabiziga kibujijwe guhagarara akanya kanini aha hakurikira :",
    options: [
      "Imbere y’ahantu hinjirwa hakasohokerwa n’abantu benshi",
      "Mu muhanda aho ugabanyijemo ibisate bigaragazwa n’imirongo idacagaguye",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 41,
    title:
      "Iyo bwije kugeza bukeye cyangwa bitewe n’uko ibihe bimeze nk’igihe cy’ibihu cyangwa cy’imvura bitagishoboka kubona neza muri m 200, udutsiko twose tw’abanyamaguru nk’imperekerane cyangwa udutsiko tw’abanyeshuri bari ku murongo bayobowe n’umwarimu, iyo bagenda mu muhanda ku isonga hakaba hari abantu barenze umwe bagomba kugaragazwa kuburyo bukurikira :",
    options: [
      "Imbere ni itara ry’umuhondo ritwariwe ibumoso",
      "Inyuma ni itara ryera ritwariwe ibumoso n’umuntu uri ku murongo w’inyuma hafi y’umurongo ugabanya umuhanda mo kabiri",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 42,
    title:
      "Utuyira turi ku mpande z’umuhanda n’ inkengero zigiye hejuru biharirwa abanyamaguru mu bihe bikurikira:",
    options: [
      "Iyo hari amategeko yihariye yerekanwa n’ibimenyetso",
      "Iyo badatatanye kandi bayobowe n’umwarimu",
      "Iyo hatari amategeko yihariye yerekanwa n’ibimenyetso",
      "Ibisubizo byose ni ukuri",
    ],
    correctAnswer: 2,
  },

  {
    id: 43,
    title:
      "Imburira zimurika zemerewe gukoreshwa kugirango bamenyeshe umuyobozi ko bagiye kumunyuraho aha hakurikira:",
    options: [
      "Mu nsisiro gusa",
      "Ahegereye inyamaswa zikurura",
      "Hafi y’amatungo",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 44,
    title:
      "Uburemere ntarengwa bwemewe ntibushobora kurenga ½ cy’uburemere bw’ikinyabiziga gikurura nubw’umuyobozi kuri romoruki zikurikira :",
    options: [
      "Romoruki ifite feri y’urugendo",
      "Romoruki idafite feri y’urugendo",
      "Romoruki itarenza kg 750",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  {
    id: 45,
    title:
      "Ibinyabiziga bifite ubugari bufite ibipimo bikurikira bigomba kugira amatara ndangaburumbarare :",
    options: ["Metero 2 na cm 10", "Metero 2 na cm 50", "Metero 3", "Metero 2"],
    correctAnswer: 0,
  },

  {
    id: 46,
    title:
      "Nta tara na rimwe cyangwa akagarurarumuri bishobora kuba bifunze ku buryo igice cyabyo cyo hasi cyane kimurika kitaba kiri hasi y’ibipimo bikurikira kuva ku butaka igihe ikinyabiziga kidapakiye :",
    options: ["Cm 30", "Cm 40", "Cm 50", "Metero 1 na cm 55"],
    correctAnswer: 1,
  },

  {
    id: 47,
    title:
      "Iyo ikinyabiziga gifite amatara abiri cyangwa menshi y’ubwoko bumwe ayo matara agomba kugira ibara rimwe n’ingufu zingana kandi akagomba gushyirwaho ku buryo buteganye uhereye ku murongo ugabanya ikinyabizigamo kabiri mu burebure bwacyo. Ariko ibi ntibikurikizwa ku matara akurikira:",
    options: [
      "itara ndangamubyimba",
      "itara ndangaburumbarare",
      "itara ribonesha icyapa kiranga numero y’ikinyabiziga inyuma",
      "A na B byose nibyo",
    ],
    correctAnswer: 2,
  },

  {
    id: 48,
    title:
      "Ahari hejuru cyane y’ubuso bumurika h’amatara ndangambere na ndanganyuma ntihashobora kuba aharenze ibipimo bikurikira hejuru y’ubutaka iyo ikinyabiziga kidapakiye:",
    options: ["m1 na cm 50", "m1 na cm 75", "m 1 na cm 90", "m2 na cm 10"],
    correctAnswer: 2,
  },

  {
    id: 49,
    title:
      "Ni ryari ikinyabiziga gishobora kugenda mu muhanda moteri itaka cyangwa vitesi idakora:",
    options: [
      "igihe kigenda ahamanuka",
      "igihe gikuruwe n’ikindi kinyabiziga",
      "igihe gifite feri y’urugendo",
      "ibisubizo byose ni byo",
    ],
    correctAnswer: 1,
  },

  {
    id: 50,
    title:
      "Umurongo mugari wera udacagaguye ushobora gucibwa ku muhanda kugirango ugaragaze ibi bikurikira:",
    options: [
      "inkombe mpimbano z’umuhanda",
      "ahahagararwa umwanya muto n’umunini",
      "ahanyura abayobozi b’amagare",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 51,
    title:
      "Buri modoka cyangwa buri romoruki ikuruwe n’iyo modoka bishobora kugira itara risa n’icyatsi kibisi bituma umuyobozi yerekana ko yabonye ikimenyetso cy’uwitegura kumunyuraho. Iryo tara rigomba gushyirwa aha hakurikira:",
    options: [
      "hafi y’inguni y’ibumoso bw’ikinyabiziga",
      "inyuma hafi y’impera y’iburyo bw’ikinyabiziga",
      "inyuma ahegereye inguni y’iburyo",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 52,
    title:
      "Ibinyabiziga bikurikira bigomba kugira icyerekana umuvuduko kiri aho umuyobozi areba neza kandi kigahora kitabwaho kugirango kigume gukora neza:",
    options: [
      "ibinyabiziga bifite umuvuduko nibura wa km 60 mu isaha",
      "ibinyabiziga bishobora kurenza km 40 mu isaha",
      "ibinyabiziga bishobora kurenza km 30 mu isaha",
      "ibinyabiziga bishobora kurenza km 25 mu isaha",
    ],
    correctAnswer: 1,
  },

  {
    id: 53,
    title:
      "Ubugari bw’imizigo yikorewe n’ipikipiki idafite akanyabiziga ko kuruhande kimwe n’ubwa romoruki ikuruwe na bene icyo kinyabiziga ntibushobora kurenza ibipimo bikurikira:",
    options: ["m 1.25", "cm 30", "cm 75", "nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 0,
  },

  {
    id: 54,
    title:
      "Ibinyabiziga bikurikira bigomba kugira itara ry’ubururu rimyatsa riboneka mu mpande zose:",
    options: [
      "ibinyabiziga bifite ubugari burenga m 2 na cm 10",
      "ibinyabiziga bya police y’igihugu",
      "ibinyabiziga ndakumirwa",
      "ibisubizo byose ni ukuri",
    ],
    correctAnswer: 2,
  },

  {
    id: 55,
    title:
      "Ibinyabiziga bihinga n’ibindi bikoresho byihariye bikoreshwa n’ibigo bipatana imirimo, iyo bigenda mu nzira nyabagendwa igihe cya nijoro cyangwa bitewe n’uko ibihe bimeze bitagishoboka kubona neza muri m 200 bishobora kugaragazwa inyuma n’amatara 2 atukura, bipfa kuba bitarenza ibipimo bikurikira:",
    options: [
      "kutarenza umuvuduko wa km20 mu isaha",
      "uburebure bwabyo habariwemo ibyo bitwaye bukaba butarengeje m6",
      "uburebure ntarengwa ntiburenga m8",
      "A na B nibyo bisubizo by’ukuri",
    ],
    correctAnswer: 3,
  },

  {
    id: 56,
    title:
      "Iyo romoruki iziritse ku kinyamitende, velomoteri n’amapikipiki bidafite akanyabiziga ko kuruhande uretse ikinyamitende na velomoteri bidafite umuyobozi, iyo uburumbarare bwayo cyangwa bw’ibyo yikoreye bituma itara ry’ikinyabiziga gikurura ritagaragara igihe bitagishoboka kubona neza muri m 200 bigomba kugaragazwa ku buryo bukurikira:",
    options: [
      "itara ryera cyangwa ry’umuhondo cyangwa risa n’icunga rihishije riri kuri rumoruki inyuma",
      "itara ry’icyatsi cyangwa ry’umuhondo cyangwa risa n’icunga rihishije riri kuri rumoruki inyuma",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 57,
    title:
      "Ku kinyabiziga cyangwa ibinyabiziga bikururana igice kirenga ku biziga ntikigomba kurenga ibipimo bikurikira:",
    options: [
      "inyuma ni m 3 na cm 50",
      "imbere ni m 1  na cm 70",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  // -------------------------- ------------------- BEGINNING OF TEST 4-------------------------------------------------

  {
    id: 58,
    title:
      "Iyo amatara y’ikinyabiziga agomba gucanwa kandi igihe imizigo isumba impera y’ikinyabiziga ho metero irenga igice gihera cy’imizigo kigaragazwa ku buryo bukurikira:",
    options: [
      "itara ritukura cyangwa akagarurarumuri ku mutuku ku manywa",
      "agatambaro gatukura gafite nibura cm 50 z’uruhande mu ijoro",
      "itara ry’umuhondo cyangwa akagarurarumuri k’umuhondo",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 59,
    title:
      "Iyo imizigo igizwe n’ibinyampeke, ikawa, ipamba idatonoye, ibishara, ibyatsi, ibishami cyangwa ubwatsi bw’amatungo bidahambiriye uretse amapaki afunze, ubugari bwayo bushobora kugera ku bipimo bikurikira:",
    options: ["m 2.50", "m 2.75", "m 3", "nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 1,
  },

  {
    id: 60,
    title:
      "Uretse mu mijyi kuyindi mihanda yagenywe na minisiteri ushinzwe gutwara ibintu n’abantu, uburemere ntarengwa bwemewe ku binyabiziga bifatanye bifite imitambiko itatu ni:",
    options: ["toni 20", "toni 16", "toni 12", "toni 10"],
    correctAnswer: 2,
  },

  {
    id: 61,
    title:
      "Buri modoka cyangwa buri romoruki ikuruwe n’iyo modoka bishobora kugira itara rituma umuyobozi yerekana ko yabonye ikimenyetso cy’uwitegura kumunyuraho. Iryo tara rifite amabara akurikira: ",
    options: ["umuhondo", "icyatsi kibisi", "umweru", "umutuku"],
    correctAnswer: 1,
  },

  {
    id: 62,
    title:
      "Ikinyabiziga cyangwa ibinyabiziga bikururana bifite imitambiko ibiri ikurikiranye mu bugari bwayo ni ukuvuga imitambiko yihindukiza kucyo ifungiyeho, uburebure bwabyo ntibugomba kurenza ibipimo bikurikira:",
    options: ["m11", "m10", "m7", "nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 2,
  },

  {
    id: 63,
    title:
      "Bumwe muri ubu bwoko bwa feri ituma imodoka iguma aho iri uko yaba yikoreye kose ku muzamuko cyangwa ku gacuri bya 16%, imyanya ya feri igomba gufata igakomeza kwegera kuburyo bw’ibyuma niyo umuyobozi yaba atarimo:",
    options: [
      "feri yo guhagarara umwanya munini",
      "feri y’urugendo",
      "feri yo gutabara",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 64,
    title:
      "Utugarurarumuri turi mu mbavu z’ikinyabiziga tugomba kugira ibara rikurikira:",
    options: ["umweru", "umuhondo", "umutuku", "Nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 1,
  },

  {
    id: 65,
    title:
      "Romoruki zifite ubugari ntarengwa bwa cm 80 zishobora gushyirwaho akagarurarumuri kamwe gusa iyo zikuruwe n’ibinyabiziga bikurikira:",
    options: [
      "velomoteri",
      "ipikipiki idafite akanyabiziga ku ruhande",
      "amavatiri y’ifasi",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  {
    id: 66,
    title:
      "Amatara maremare y’ibara ryera cyangwa ry’umuhondo agomba, nijoro igihe ijuru rikeye, kumurika mu muhanda mu ntera ya m 100 nibura imbere y’ikinyabiziga, ariko ku binyabiziga bifite moteri itarengeje za sentimetero kibe 125 iyo ntera igira ibipimo bikurikira:",
    options: ["m200", "m100", "m85", "nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 3,
  },

  {
    id: 67,
    title:
      " Iyo banyuze iruhande rw’inkomyi abanyamaguru bagomba gukikira banyuze mu muhanda, abayobozi bagomba gusiga umwanya ufite ubugari bwa m 1 nibura hagati yabo nayo. Iyo ibyo bidashobora kubahirizwa kandi umunyamaguru akaba anyura hafi yiyo nkomyi, umuyobozi agomba kuyikikira afite umuvuduko utarengeje ibipimo bikurikira: ",
    options: [
      "km 10 mu isaha",
      "km 20 mu isaha",
      "km 30 mu isaha",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 68,
    title:
      "Guhagarara akanya gato no guhagarara akanya kanini bibujijwe cyane cyane aha hakurikira:",
    options: [
      "ku mihanda y’icyerekezo kimwe hose",
      "mu ruhande ruteganye n’urwo ikindi kinyabiziga gihagazemo akanya gato cyangwa kanini",
      "ku mihanda ibisikanirwamo, iyo ubugari bw’umwanya w’ibinyabiziga ugomba gutuma bibisikana butagifite m12",
      "ibisubizo byose nibyo",
    ],
    correctAnswer: 1,
  },

  {
    id: 69,
    title:
      "Amatara ndangambere n’aya ndanganyuma y’imodoka zitarengeje m 6 z’uburebure na m 2 z’ubugari habariwemo imitwaro kdi nta kinyabiziga kindi kiziritseho ashobora gusimburwa n’amatara akurikira, iyo ibyo binyabiziga bihagaze umwanya muto cyangwa munini mu nsisiro bibangikanye ku ruhande rw’umuhanda:",
    options: [
      "amatara magufi",
      "amatara ndangaburumbarare",
      "amatara yo guhagarara umwanya munini",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 70,
    title:
      "Iyo kuva bwije kugeza bukeye cyangwa bitewe nuko ibihe bimeze nk’igihe cy’igihu cyangwa cy’imvura bitagishoboka kubona neza muri m 200, imirongo y’ingabo z’igihugu zigendera kuri gahunda n’utundi dutsiko twose tw’abanyamaguru nk’imperekerane cyangwa udutsiko tw’abanyeshuri bari ku murongo bayobowe na mwarimu, iyo bagenda mu muhanda ku isonga hakaba hari abantu barenze umwe, bagaragzwa ku buryo bukurikira:",
    options: [
      "imbere ni itara ryera ritwariwe ku ruhande rw’ibumoso n’umuntu uri ku murongo w’imbere hafi y’umurongo ugabanya umuhanda mo kabiri",
      "inyuma ni itara umuhondo ritwariwe ku ruhande rw’ibumoso n’umuntu uri ku murongo w’inyuma hafi y’umurongo ugabanya umuhanda mo kabiri",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 71,
    title:
      "Imizigo yikorewe n’amagare, velomoteri, amapikipiki, ibinyamitende by’ibiziga bitatu nibyo ibiziga bine bifite cyangwa bidafite moteri inyuma ntishobora kurenza ibipimo bikurikira:",
    options: ["cm 20", "cm 30", "cm 50", "cm 60"],
    correctAnswer: 2,
  },

  {
    id: 72,
    title: "Itara ndanganyuma rigomba gushyirwa aha hakurikira:",
    options: [
      "ahagereye inguni y’ibumoso y’ikinyabiziga",
      "ahagereye inguni y’iburyo bw’ikinyabiziga",
      "inyuma kandi y’impera y’ibumoso bw’ikinyabiziga",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 73,
    title:
      "Nta tara na rimwe cyangwa utugarurarumuri bishobora kuba bifunze kuburyo igice cyabyo cyo hasi cyane kimurika kitaba kiri hasi ya cm 40 kuva ku butaka igihe ikinyabiziga kidapakiye ariko ibyo ntibikurikizwa ku matara akurikira:",
    options: [
      "amatara kamenabihu",
      "amatara yo gusubira inyuma",
      " A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 74,
    title:
      "Iyo tumuritswe n’amatara y’urugendo y’i kinyabiziga utugarurarumuri tugomba n’ijoro, igihe ijuru rikeye kubonwa n’umuyobozi w’ikinyabiziga kiri mu ntera ikurikira:",
    options: [
      "metero 100",
      "metero 150",
      "metero 200",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  {
    id: 75,
    title:
      "Ibinyabiziga bigendeshwa na moteri, hatarimo velomoteri n’ibinyabiziga bidapakiye umuvuduko wabyo udashobora kurenga km 50 mu isaha ahateganye bigomba kuba bifite ibikoresho by’ihoni byumvikanira mu ntera ikurikira:",
    options: ["metero 200", "metero 150", "metero 100", "metero 50"],
    correctAnswer: 2,
  },

  {
    id: 76,
    title:
      "Ahatari mu nsisiro ibyapa biburira n’ibyapa byo gutambuka mbere bigomba gushyirwa mu ntera ikurikira y’ahantu habyerekana:",
    options: [
      "metero 150 kugeza kuri 200",
      "metero 100 kugeza kuri 150",
      "metero 50 kugeza kuri  100",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 77,
    title:
      "Inkombe z’inzira nyabagendwa cyangwa z’umuhanda zishobora kugaragazwa n’ibikoresho ngarurarumuri. Ibyo bikoresho bigomba gushyirwaho ku buryo abagenzi babibona ku buryo bukurikira:",
    options: [
      "babona iburyo bwabo ibyibara ritukura cyangwa ibisa n’icunga rihishije",
      "ibumoso babona iby’ibara ryera",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  // -------------------------- ------------------- BEGINNING OF TEST 5-------------------------------------------------

  {
    id: 78,
    title:
      "Ahatari mu nsisiro, umuyobozi wese ugenza ikinyabiziga kimwe cyangwa ibinyabiziga bikomatanye bifite uburemere ntarengwa bwemewe burenga ibiro 3500 cyangwa bifite uburebure bwite burenga metero 10 agomba, keretse iyo anyuze cyangwa agiye kunyura ku bindi binyabiziga, gusiga hagati y’ikinyabiziga cye n’iki muri imbere umwanya uhagije kugirango ibinyabiziga bimuhiseho bishobore kuhigobeka bidateje impanuka igihe bibaye ngombwa ariko ibyo ntibikurikizwa mu bihe bikurikira:",
    options: [
      "mu gihe ibigendera mu muhanda ari byinshi kimwe no mu duce tw'inzira nyabagendwa aho kunyuranaho bibujijwe",
      "igihe ibigendera mu muhanda ari byinshi",
      "mu duce tw’inzira nyabagendwa aho kunyuranaho bibujijwe",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 79,
    title:
      "Ibiziga by’ibinyabiziga bigendeshwa na moteri n’ibya velomoteri kimwe n’ibya romoruki zabyo bigomba kuba byambaye inziga zihagwa zifite amano n’ubujyakuzimu butari munsi ya milimetero imwe ku migongo yabyo yose nubudodo bwabyo ntibugire ahantu na hamwe bugaragara kandi ntibugire aho byacitse bikomeye mu mpande zabyo ariko ibyo ntibikurikizwa ku binyabiziga bikurikira:",
    options: [
      "ibinyabiziga bidapakiye kandi bitajya birenza umuvuduko wa km 25 mu isaha ahateganye",
      "ibinyabiziga bya police bijya ahatarenga km 25 uvuye aho biba",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 80,
    title:
      "Amatara ndangacyerekezo agomba kuba agizwe n’ibintu bifashe ku rumuri rumyasa, biringaniye ku buryo bigira umubare utari igiharwe ku mpande z’imbere n’inyuma z’ikinyabiziga ayo matara aba afite amabara akurikira:",
    options: [
      "amatara y’imbere aba yera cyangwa ari umuhondo",
      "ayinyuma aba atukura cyangwa asa n’icunga rihishije",
      "A na B ni ibisubizo by’ukuri",
      "ayinyuma aba asa n’icunga rihishije",
    ],
    correctAnswer: 2,
  },

  {
    id: 81,
    title:
      "Amahoni y’ibinyabiziga bigendeshwa na moteri agomba kohereza ijwi ry’injyana imwe rikomeza kandi ridacengera amatwi ariko ibinyabiziga bikurikira bishobora kugira ihoni ridasanzwe ridahuye n’ibivuzwe haruguru:",
    options: [
      "ibinyabiziga ndakumirwa",
      "ibinyabiziga bikora ku mihanda",
      "ibinyabiziga bifite ubugari burenze m 2.10",
      "A na B ni ibisubizo by’ukuri",
    ],
    correctAnswer: 3,
  },

  {
    id: 82,
    title:
      "Icyapa kibuza kunyura kubindi binyabiziga byose uretse ibinyamitende ibiri n’amapikipiki adafite akanyabiziga ku ruhande gifite ibimenyetso by’amabara akurikira:",
    options: [
      "umweru n’umukara",
      "umutuku n’umukara",
      "ubururu",
      "A na B ni ibisubizo by’ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 83,
    title:
      "Icyapa kivuga ko hatanyurwa mu byerekezo byombi kirangwa n’ubuso bw’ibara rikurikira:",
    options: ["umukara", "umweru", "ubururu", "umutuku"],
    correctAnswer: 1,
  },

  {
    id: 84,
    title:
      "Ibinyabiziga bikurikira bigomba kugira ibikoresho by’ihoni byumvikanira mu ntera ya m 20:",
    options: [
      "amapikipiki",
      "velomoteri",
      "ibinyabiziga bigendeshwa na moteri bidapakiye",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  {
    id: 85,
    title:
      "Imirongo y’ingabo z’igihugu zigendera kuri gahunda n’utundi dutsiko twose tw’abanyamaguru nk’imperekerane cyangwa udutsiko tw’abanyeshuri iyo bitagishoboka kubona neza muri m200, bagaragazwa  ni itara ryera imbere naho inyuma ni itara ry’umutuku ariko iyo uburebure bwiyo mirongo cyangwa bw’utwo dutsiko burenga m6 impande zatwo cyangwa zayo zigaragazwa ku buryo bukurikira:",
    options: [
      "itara rimwe cyangwa menshi yera",
      "amatara menshi y’umuhondo",
      "amatara menshi asa n’icunga rihishije",
      "ibisubizo byose nibyo",
    ],
    correctAnswer: 3,
  },

  {
    id: 86,
    title:
      "Amatara ndangambere na ndanganyuma y’imodoka zitarengeje m 6 z’uburebure na m 2 z’ubugari habariwemo imitwaro kandi nta kindi kinyabiziga kiziritseho ashobora gusimburwa n’amatara yo guhagarara umwanya munini iyo ibyo binyabiziga bihagaze umwanya muto cyangwa munini mu nsisiro bibangikanye ku ruhande rw’umuhanda. Ayo matara arangwa n’amabara akurikira:",
    options: [
      "umweru cyangwa umuhondo imbere",
      "umutuku cyangwa umuhondo inyuma",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 87,
    title:
      "Amatara ndangaburumbarare agomba kubonwa nijoro igihe ijuru rikeye n’umuyobozi w’ikinyabiziga kiri mu ntera ya :",
    options: ["m 50 nibura", "m 100", "m 150", "m 200 nibura"],
    correctAnswer: 3,
  },

  {
    id: 88,
    title:
      "Uretse ku byerekeye imihanda iromboreje y’ibisate byinshi n’imihanda yimodoka igice cy’umuhanda kiri hakurya y’umurongo mugari wera ucibwa ku muhanda ngo ugaragaze inkombe mpimbano zawo kigenewe ibi bikurikira:",
    options: [
      "guhagararwamo umwanya muto gusa",
      "guhagararwamo umwanya munini gusa",
      "guhagararwamo umwanya muto n’umunini",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 89,
    title:
      "Ibimenyetso by’agateganyo bigizwe n’imitemeri y’ibara risa n’icunga rihishije bishobora gusimbura ibi bikurikira:",
    options: [
      "imirongo yera irombereje idacagaguye gusa",
      "imirongo yera irombereje idacagaguye n’icagaguye",
      "imirongo icagaguye n’idacagaguye ibangikanye",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  {
    id: 90,
    title:
      "Iyo bitagishoboka kubona muri m 200 imodoka zikuruwe n’inyamaswa, ingorofani, inyamaswa zitwaye imizigo cyangwa zigenderwamo kimwe n’amatungo bigomba kurangwa na :",
    options: [
      "imbere ni itara ryera",
      "imbere ni itara ry’umuhondo cyangwa risa n’icunga rihishije",
      "inyuma ni itara rimwe ritukura",
      "ibisubizo byose ni ukuri",
    ],
    correctAnswer: 3,
  },

  {
    id: 91,
    title:
      "Uretse igihe hari amategeko yihariye akurikizwa muri ako karere ikinyabiziga cyose gihagaze umwanya muto cyangwa munini, iyo gihagaze mu mwanya wo kuruhande wagenewe abanyamaguru, kugirango bashobore kugenda batagombye kunyura mu muhanda, umuyobozi agombye kubasigira akayira gafite byibura ibipimo bikurikira by’ubugari:",
    options: ["m 1", "m 2", "m 0.5", "nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 0,
  },

  {
    id: 92,
    title:
      "Icyapa cyerekana ahantu hagenewe guhagararwamo n’imodoka nini zagenewe gutwara abantu cyirangwa n’ubuso bw’amabara akurikira:",
    options: ["ubururu", "umweru", "umutuku", "nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 3,
  },

  {
    id: 93,
    title:
      "Icyapa cyerekana ko inzira giteyeho mu ntangiriro idakomeza kigaragazwa n’ikirango (ikimenyetso) cy’amabara akurikira:",
    options: [
      "umukara n’umutuku",
      "umukara n’umweru",
      "umweru n’umutuku",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 94,
    title:
      "Buri modoka yagenewe gutwara abantu, ariko umubare wabo ntarengwa ukaba munsi ya 6 umuyobozi abariwemo igomba kugira imikandara yo kurinda ibyago igenewe aba bakurikira:",
    options: [
      "umuyobozi",
      "umugenzi wicaye ku ntebe y’imbere",
      "ishobora no kugira imikandara kuzindi ntebe z’inyuma",
      "ibisubizo byose ni ukuri",
    ],
    correctAnswer: 3,
  },

  {
    id: 95,
    title:
      "Usibye ibinyabiziga by'ingabo z'Igihugu, Ikinyabiziga kigendeshwa na moteri kiriho ibyuma ntamenwa cyangwa ikindi cyose gituma gikoreshwa mu gutera cyangwa mu kwitabara ntigishobora kugenda mu nzira nyabagendwa kidafite uruhushya rwihariye. Urwo ruhushya rutangwa naba bakurikira:",
    options: [
      "police y’igihugu",
      "minisitiri ushinzwe gutwara abantu n’ibintu",
      "minisitiri w’ingabo",
      "ikigo cy’igihugu gishinzwe imisoro n’amahoro.",
    ],
    correctAnswer: 1,
  },

  {
    id: 96,
    title:
      "Iyo umukumbi ugizwe n’amatungo maremare arenze ane cyangwa amatungo magufi arenze atandatu mu nzira nyabagendwa iyo hatakibona neza kuburyo umuyobozi abona muri m 200 ugomba kugaragazwa kuburyo bukurikira:",
    options: [
      "itara ry’urumuri rwera cyangwa rusa n’icunga rihishije imbere y’umukumbi",
      "itara ry’urumuri rutukura cyangwaumuhondo ritwawe inyuma y’umukumbi",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 97,
    title:
      "Ibinyabiziga biherekeranyije mu butumwa ntibishobora gutonda uburebure burenga umurongo wa m 500. Iyi bibaye bityo ibinyabiziga biherekeranye mu butumwa bishobora kugabanwamo amatsinda atonze umurongo atarengeje m 50 z’uburebure kdi hagati yayo hakaba byibura m 50 ariko ibyo ntibikurikizwa kubinyabiziga bikurikira:",
    options: [
      "ibinyabiziga bya police biherekeranyije",
      "ibinyabiziga by’abasirikare biherekeranyije mu nsisiro",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  // ----------------------------------- ------- BEGINNING OF TEST 6 ----------------------------------------------

  {
    id: 98,
    title:
      "Iyo ikinyabiziga gikururwa n’inyamaswa nacyo gikuruye ikindi uburebure bw’ibikururwa bukaba burenga m 18 hatabariwemo icyo kinyabiziga cya mbere kiziritseho hagomba ibi bikurikira:",
    options: [
      "umuherekeza w’ikinyabiziga cya kabiri",
      "abaherekeza babiri",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 99,
    title:
      "Ibinyabiziga bikurikira ntibitegetswe kugira ibimenyetso bibyerekana iyo byambukiranya umuhanda cyangwa bigenda ku ruhande rwawo:",
    options: [
      "ibinyabiziga bigendwamo n’abana",
      "ibinyabiziga bigendwamo n’abamugaye",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 100,
    title:
      "Icyapa cy’inyongera kigaragaza ikibanza cy’ingando cyangwa cy’abantu benshi bagendera ku nyamaswa kirangwa n’amabara akurikira:",
    options: [
      "ubururu, umweru n’umukara",
      "umukara umweru n’umuhondo",
      "icyatsi kibisi, umuhondo n’ikirango cy’umukara",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 101,
    title:
      "Icyapa cyerekana ahantu  amategeko y’ Umuhanda urombeje w’ibice byinshi atangirira gukurikizwa,  kirangwa n’ibirango (ibimenyetso) by’amabara akurikira:",
    options: [
      "umweru n’umukara",
      "umweru n’umutuku",
      "umweru n’umuhondo",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 102,
    title:
      "Igihe ikorwa ry’imirimo ribangamiye cyane cyangwa buke uburyo bwo kugenda mu nzira nyabagendwa, ahakorerwa imirimo hagaragazwa ku buryo bukurikira:",
    options: [
      "icyapa cyera cya mpande enye, zingana zifite uruhande rwa metero 0.30",
      "uruzitiro ruri ku mpera y’iburyo",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 103,
    title:
      "Iyo mu muhanda, imirimo yihariye ubugari butuma abayobozi bagomba kuva mu mwanya wabo usanzwe kugirango bakomeze urugendo, ahategetswe kunyurwa hagaragazwa n’ikimenyetso gishyirwa aho imirimo irangirira mu ruhande rugenderwamo. Icyo kimenyetso kirangwa n’amabara akurikira:",
    options: [
      "ubuso bw’ubururu ikirango cy’umweru",
      "umuzenguruko w’umutuku, ubuso umweru n’ikirango cy’umukara",
      "umuzenguruko w’umutuku, ubuso mu ibara ryera, ikirango mu ibara ry’umutuku n’umukara",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 104,
    title:
      "Icyapa cyerekana ko hari amabwiriza yihariye mu buryo bwo kugendera mu cyambu cyangwa ku kibuga cy’indege giteye ku buryo bukurikira:",
    options: [
      "ishusho mpandeshatu, ubuso mu ibara ryera, ikirango mu ibara ry’umukara",
      "ishusho mpandenye, ubuso mu ibara ry’ubururu n’ikirango kiri mu ibara ryera",
      "ishusho y’uruziga mu ibara ry’ubururu ni ikirango kiri mu ibara ryera",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  {
    id: 105,
    title:
      "Nijoro igihe ijuru rikeye, itara ribonesha icyapa kiranga numero y’ikinyabiziga rigomba gutuma izo numero zisomerwa nibura mu ntera ikurikira:",
    options: ["m150", "m50", "m20", "m10"],
    correctAnswer: 2,
  },

  {
    id: 106,
    title:
      "Ibyapa byerekana icyago cyidahoraho kandi bigenewe kwerekana aho bagana cyangwa aho berekeza  umuhanda nk’igihe cy’impanuka cyangwa hari imirimo ikorwa mu muhanda birangwa n’amabara akurikira:",
    options: [
      "umweru n’umukara",
      "umweru n’umuhondo",
      "ubuso bw’umweru gusa",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 107,
    title:
      "Birabujijwe kubangamira imigendere isanzwe y’ibindi binyabiziga kubera ibi bikurikira:",
    options: [
      "kugabanya umuvuduko kuburyo budasanzwe",
      "gukacira feri bidatewe no kwirinda ibyago",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 108,
    title:
      "Iyo kuva bwije kugeza bukeye cyangwa bitewe n’uko ibihe bimeze bitagishoboka kubona neza muri m 200, mu nzira nyabagendwa, romoruki iziritse kuri velomoteri cyangwa ipikipiki idafite akanyabiziga ku ruhande, uretse velomoteri idafite umuyobozi, kandi uburumbarare bwayo, cyangwa bw’ibyo yikoreye bukaba butuma itara ry’ikinyabiziga biyikurura ritagaragara, iyo romoruki igaragazwa ku buryo bukurikira:",
    options: [
      "itara ryera riri kuri romoruki inyuma",
      "itara ry’umuhondo riri kuri romoruki inyuma",
      "itara risa n’icunga riri kuri romoruki inyuma",
      "ibi bisubizo byose nibyo",
    ],
    correctAnswer: 3,
  },

  {
    id: 109,
    title: "Amatara maremare y’ikinyabiziga agomba kuzimwa mu bihe bikurikira:",
    options: [
      "iyo umuhanda umurikiwe hose kandi umuyobozi ashobora kubona nibura mu ntera ingana na metero 200",
      "iyo ikinyabiziga gikurikiye mu ntambwe zitagera muri m100 keretse iyo umuyobozi wacyo ashaka kunyura kucyo akurikiye acana azimya vuba vuba amatara maremare",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 110,
    title:
      "Iyo akanyabiziga gasunikwa cyangwa ibyo gatwaye bidatuma umuyobozi abona neza imbere ye, uwo muyobozi agomba gukora ibi bikurikira:",
    options: [
      "gushaka umuherekeza",
      "gukurura ikinyabiziga cye",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  {
    id: 111,
    title:
      "Uretse igihe hari amategeko yihariye akurikizwa muri ako karere cyangwa imitunganyirize bwite y’aho, ikinyabiziga cyose cyangwa inyamaswa ihagaze umwanya muto cyangwa munini igomba kuba iri aha hakurikira:",
    options: [
      "mu kaboko k’iburyo hakurikijwe aho yaganaga uretse igihe ari mu muhanda w’icyerekezo kimwe",
      "ahegereye bishobotse akayira k’abanyamaguru iyo umuhanda ugafite ariko umwanya w’ibiziga n’akayira ntube urenga santimetero 50",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 112,
    title:
      "Iyo ikinyabiziga gihagaritswe n’ijoro ku buryo abayobozi bakigana badashobora kumenya ko kibabereye imbogamizi, kigomba kurangirwa kure n’ikimenyetso cyabigenewe kiri ahantu hagaragara kugirango kiburire hakiri kare abandi bayobozi baza bagisanga, ariko ntibireba ibinyabiziga bikurikira:",
    options: [
      "velomoteri",
      "ipikipiki idafite akanyabiziga ku ruhande",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 113,
    title:
      "Abanyamaguru batatanye cyangwa bagize udutsiko tudafatanyije gahunda kdi batanayobowe n’umwarimu bategetswe kunyura mu tuyira turi ku mpande z’umuhanda no ku nkengero zigiye hejuru uretse ubutaka butsindagiye butandukanya imihanda ibiri bwo kunyurwamo gusa n’aba bakurikira:",
    options: [
      "abanyamaguru bashaka guhagarara akanya gato igihe bambukiranya umuhanda",
      "abanyamaguru bagize udutsiko tw’abantu benshi",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 114,
    title:
      "Ibinyabiziga biherekeranyije mu butumwa ntibishobora gutonda uburebure burenga umurongo wa m 500, iyo bibaye bityo ibinyabiziga biherekeranyije mu butumwa bishobora kugabanywamo amatsinda atonze umurongo utarengeje ibipimo bikurikira:",
    options: [
      "utarengeje m50",
      "utarengeje m100",
      "utarengeje 150",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 115,
    title:
      "Ibyapa byereka inkomane y’inzira nyabagendwa n’inzira ya gariyamoshi bigomba iteka kumurikwa cyangwa kugarura urumuri ku buryo bigaragarira nibura mu ntera ikurikira igihe ijuru rikeye:",
    options: ["m200", "m 250", "m300", "nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 3,
  },

  {
    id: 116,
    title:
      "Imbibi ziri ku mpera z’ubwihugiko bw’abanyamaguru kandi ziri mu muhanda kimwe n’imbibi n’ibindi bikoresho bigenewe gutuma bagenda mu muhanda nta muvundo zisigwa irangi ry’ibara rikurikira:",
    options: [
      "irangi ry’umuhondo ngarurarumuri",
      "irangi ry’umweru ngarurarumuri",
      "irangi risa n’icunga rihishije ngarurarumuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 117,
    title:
      "Kugirango ikinyabiziga kive ahantu hari urwondo cyangwa hanyerera bidasanzwe hashobora gukoreshwa uburyo bukurikira:",
    options: [
      "inziga zishobora gushyirwaho udushyundu",
      "inziga zishobora gushyirwaho iminyururu irwanya ubunyerere",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  // ----------------------------------- ------- BEGINNING OF TEST 7 ----------------------------------------------

  {
    id: 118,
    title:
      "Iyo imizigo igizwe n’ibinyampeke, ikawa, amakara, ubwatsi bw’amatungo bidahambiriye, ubugari bwayo bushobora kugera kuri m2 na cm75 ariko iyo iyo mizigo ijyanwa mu karere katarenga km25 uvuye aho yapakiriwe, usibye mu nsisiro, ubugari bwayo bushobora kugera ku bipimo bikurikira:",
    options: ["m4", "m3 na cm50", "m3", "nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 2,
  },
  {
    id: 119,
    title:
      "Mu mujyi no ku mihanda y’igihugu igenwa na minisitiri ushinzwe gutwara abantu n’ibintu, ubwikorere ntarengwa ku ikamyo iyo ariyo yose ntibushobora kurenga ibipimo bikurikira:",
    options: ["toni 10", "toni 16", "toni 24", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 3,
  },

  {
    id: 120,
    title:
      "Iyo bitewe n’imiterere y’ahantu intera itandukanya icyapa n’ahantu habi iri munsi ya m150 ku buryo bugaragara, iyo ntera yerekanishwa icyapa cy’inyongera giteye ku buryo bukurikira:",
    options: [
      "kare ifite ubuso bw’ibara ryera",
      "urukiramende rufite ubuso bw’ibara ryera",
      "mpandeshatu ifite umuzenguruko utukura",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 1,
  },

  {
    id: 121,
    title:
      "Nijoro, amatara yo kubisikana y’ibara ryera cyangwa y’umuhondo agomba, igihe ijoro rikeye kumurika mu muhanda nibura mu ntera ikurikira:",
    options: ["m100", "m50", "m40", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 2,
  },

  {
    id: 122,
    title:
      "Ikintu cyose cyatuma hahindurwa ibyanditse bireba nyirikarita cyangwa ibiranga ikinyabiziga kigomba kumenyeshwa ibiro by’umusoro haba mu magambo cyangwa mu ibaruwa ishinganye ibyo bikorwa mu gihe kingana gute:",
    options: [
      "mu mezi 2",
      "mu kwezi kumwe",
      "mu minsi cumi n’itanu",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 123,
    title:
      "Kugirango berekane ahantu habi cyane, hakoreshwa ikimenyetso cy’itara ry’umuhondo rimyasa,  rivuga uburenganzira bwo gutambuka icyo kimenyetso barushijeho kwitonda. Ese icyo kimenyetso gihindura iki ku mategeko agenga gutambuka mbere:",
    options: [
      "ntacyo gihindura",
      "abo rireba nibo batambuka mbere",
      "abatwaye ibinyabiziga binini nibo batambuka mbere",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 0,
  },

  {
    id: 124,
    title:
      "Romoruki zifite ubugari ntarengwa bwa sentimetero 80 zishobora gushyirwaho akagarurarumuri kamwe gusa iyo zikuruwe n’ibinyabiziga bikurikira:",
    options: [
      "velomoteri",
      "ipikipiki ifite akanyabiziga kuruhande",
      "igare",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 125,
    title:
      "Amatara maremare y’ibara ryera cyangwa ry’umuhondo agomba nijoro igihe ijuru rikeye kumurika mu ntera ikurikira ku binyabiziga bifite moteri itarengeje ingufu zigera kuri sentimetero kibe 125",
    options: ["m100", "m75", "m25", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 1,
  },

  {
    id: 126,
    title:
      "Iyo kuva bwije kugeza bukeye cyangwa bitewe n’uko ibintu bimeze bitagishoboka kubona muri m 200, ibinyabiziga cyangwa imitwaro bifite ubugari burenga m 2.50 iyo bigenda mu nzira nyabagendwa bigaragazwa ku buryo bukurikira:",
    options: [
      "inyuma ni amatara abiri atukura",
      "iyo bibaye ngombwa no ku mpera y’amabondo y’ikinyabiziga cyangwa y’imitwaro ni itara ndangaburumbarare risa n’icunga rihishije cyangwa ry’umuhondo",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 2,
  },

  {
    id: 127,
    title:
      "Igice cy’umuhanda kiri hakurya y’umurongo mugari wera udacagaguye ugaragaza inkombe mpimbano y’umuhanda kiba kigenewe ibi bikurikira:",
    options: [
      "guhagararwamo umwanya muto gusa",
      "guhagararwamo umwanya muto n’umunini ndetse no kumihanda irombereje y’ibisate byinshi n’imihanda y’imodoka",
      "A na B ni ibisubizo by’ukuri",
      " nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 128,
    title:
      "Iminyururu n’ibindi byuma bifashisha bishobora kuvanwaho cyangwa binagana, hatabariwemo ibimenyetso byerekana ibyerekezo bigomba gutungurwa ku kinyabiziga ku buryo igihe byizunguza bitarenga impande zihera uburumbarare bw’ikinyabiziga kandi ibyo byuma bifashisha ntibigomba gukururuka ku butaka ariko ibyo ntibibujijwe ku binyabiziga bikurikira:",
    options: [
      "imashini zihinga",
      "ibinyabiziga bitwaye ibintu bidashobora gufata inkongi",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 0,
  },

  {
    id: 129,
    title:
      "Ku binyabiziga cyangwa ibinyabiziga bikururana igice kirenga ku biziga ntigishobora kurenga ibipimo bikurikira:",
    options: [
      "iby’inyuma : m3",
      "iby’imbere: m2.70",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 1,
  },

  {
    id: 130,
    title:
      "Uretse bibonewe uruhushya, ubundi birabujijwe gushyira no gukomeza kugendesha imodoka cyangwa romoruki mu nzira nyabagendwa iyo uburemere bw’ibyikorewe burenze uburemere ntarengwa bwemewe n’ikarita iranga ikinyabiziga ariko ibyo ntibikurikizwa ku binyabiziga bikurikira:",
    options: [
      "ibinyabiziga bya police",
      "ibinyabiziga bihinga",
      "imashini zikoreshwa mu kubaka imihanda",
      "ibisubizo byose ni ukuri",
    ],

    correctAnswer: 2,
  },

  {
    id: 131,
    title:
      "Gushyira mu muhanda ku buryo budasanzwe ibinyabiziga bikururana birenze bitatu bigomba gutangirwa uruhusa, uretse imashini ihinga iyo zigenda uregendo rutarenze km 25, ibinyabiziga bikururana bitwaye ibyamamazwa n’ibindi biteganwa n’iri teka ariko igiteranyo cy’uburebure bw’ibyo binyabiziga bikururana ntigishobora kurenga ibipimo bikurikira:",
    options: ["m50", "m35", "m25", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 2,
  },

  {
    id: 132,
    title:
      "Ibinyamitende itatu bifite moteri bigomba kugira amatara akurikira:",
    options: [
      "amatara abiri ndangambere n’amatara abiri ndanganyuma yerekana ko ikinyabiziga gihagaze",
      "utugarurarumuri tubiri",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 2,
  },

  {
    id: 133,
    title: "Ibyapa bibuza n’ibitegeka bikurikizwa gusa aha hakurikira:",
    options: [
      "mu masangano",
      "mu gice cy’inzira nyabagendwa kiri hagati yaho bishinze n’inkomane ikurikiyeho ku ruhande rw’inzira bishinzeho",
      "ibyo byapa bishyirwaho hakurikijwe intera ibitandukanya",
      "B na C ni ibisubizo by’ukuri",
    ],

    correctAnswer: 1,
  },

  {
    id: 134,
    title:
      "Icyapa cy’inyongera kerekana aho bagobokera ibinyabiziga kirangwa n’amabara akurikira:",
    options: [
      "ubururu, umweru, umutuku",
      "umweru, umukara, ubururu",
      "umutuku, umweru n’umukara",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 1,
  },

  {
    id: 135,
    title:
      "Icyapa cyerekana uburebure bw’igice cyatera ibyago cyangwa bw’ahantu amabwiriza y’icyo cyapa agomba gukurikizwa kirangwa n’ubuso n’ibimenyetso bikurikira:",
    options: [
      "ubuso umweru, ikimenyetso ubururu",
      "ubuso ubururu, ikimenyetso umweru",
      "ubuso ubururu, ikimenyetso umweru n’umukara",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 136,
    title:
      "Umurongo w’umuhondo ucagaguye uciye ku nkombe nyayo y’umuhanda, umusezero w’inzira y’abanyamaguru cyangwa w’inkengero y’umuhanda yegutse uvuga ibi bikurikira:",
    options: [
      "guhagarara umwanya muto birabujijwe ku burebure bw’uwo murongo",
      "guhagarara umwanya muto n’umunini birabujijwe ku burebure bw’uwo murongo",
      "aho bahagarara umwanya munini cyangwa muto",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 137,
    title:
      "Ku binyabiziga cyangwa ibinyabiziga bikururana igice kirenga ku biziga ntigishobora kurenga ibipimo bikurikira:",
    options: [
      "iby’inyuma m 3.40",
      "iby’imbere m 2.50",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  // ----------------------------------- ------- BEGINNING OF TEST 8 ----------------------------------------------

  {
    id: 138,
    title:
      "Mu migi no ku yindi mihanda y’igihugu igenwa na minisitiri ushinzwe gutwara abantu n’ibintu uburebure ntarengwa kuri buri mitambiko 3 ifungwaho ibiziga bine ni:",
    options: ["toni 24", "toni 10", "toni 16", "toni 53"],

    correctAnswer: 0,
  },

  {
    id: 139,
    title:
      "Iyo hagati y’uruhande rw’imbere rwa romoruki n’uruhande rw’inyuma rw’ikinyabiziga kiyikurura hari umwanya urenze m 3 ikibizirikanyije kigomba kugaragazwa ku buryo bukurikira iyo amatara y’ikinyabiziga agomba gucanwa:",
    options: [
      "agatambaro gatukura gafite nibura cm 50 z’uruhande",
      "itara risa n’icunga rihishije rigaragara mu mbavu igihe ikibizirikanyije kimuritswe",
      "A na B  ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 1,
  },

  {
    id: 140,
    title:
      "Itara ryo guhagarara ry’ibara ritukura rigomba kuba ridahumisha, kandi rigomba kugaragarira mu ntera ikurikira:",
    options: [
      "nijoro igihe ijuru rikeye nibura muri m 200",
      "ku manywa igihe cy’umucyo  nibura muri m50",
      "nijoro nibura muri m 100 igihe ijuru rikeye",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 141,
    title:
      "Birabujijwe kongera ku mpande z’ikinyabiziga kigendeshwa na moteri cyangwa velomoteri ibi bikurikira:",
    options: [
      "imitako",
      "ibintu bifite imigongo cyangwa ibirenga ku mubyimba kandi bishobora gutera ibyago abandi bagenzi",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 2,
  },

  {
    id: 142,
    title:
      "Ikintu cyose cyatuma hahindurwa ibyanditswe bireba nyirikarita cyangwa ibiranga ikinyabiziga kigomba kumenyeshwa ibiro by’imisoro haba mu magambo cyangwa mu ibaruwa ishinganye. Ibyo bikorwa mu gihe kingana gute:",
    options: [
      "mu minsi 5",
      "mu minsi 8",
      "mu minsi 15",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 1,
  },

  {
    id: 143,
    title: "Kunyuranaho bikorerwa:",
    options: [
      "mu ruhande rw’iburyo gusa",
      "igihe cyose ni ibumoso",
      "iburyo iyo unyura ku nyamaswa",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 144,
    title:
      "Iyo ubugari bw’inzira nyabagendwa igenderwamo n’ibinyabiziga budahagije kugirango bibisikane nta nkomyi abagenzi bategetswe:",
    options: [
      "kunyura mu nzira z’impande z’abanyamaguru",
      "guhagarara aho bageze",
      "koroherana",
      "gukuraho inkomyi",
    ],

    correctAnswer: 2,
  },

  {
    id: 145,
    title:
      "Umuyobozi ugenda mu muhanda igihe ubugari bwawo budatuma anyuranaho nta nkomyi ashobora kunyura mu kayira k’abanyamaguru ariko amaze kureba ibi bikurikira:",
    options: [
      "umuvuduko w’abanyamaguru",
      "ubugari bw’umuhanda",
      "umubare w’abanyamaguru",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 146,
    title:
      "Icyapa cyerekana umuvuduko ntarengwa ikinyabiziga kitagomba kurenza gishyirwa ku binyabiziga bifite uburebure ntarengwa bukurikira:",
    options: [
      "burenga toni 1",
      "burenga toni 2",
      "burenga toni 24",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 147,
    title:
      "Iyo nta mategeko awugabanya by’umwihariko, umuvuduko ntarengwa w’amapikipiki mu isaha ni:",
    options: ["km 25", "km 70", "km 40", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 3,
  },

  {
    id: 148,
    title: "Ahatari mu nsisiro umuvuduko ntarengwa wa velomoteri mu isaha ni:",
    options: ["km 50", "km 40", "km 30", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 0,
  },

  {
    id: 149,
    title: "Birabujijwe guhagarara akanya kanini aha hakurikira:",
    options: [
      "mu duhanda tw’abanyamagare",
      "mu duhanda twagenewe velomoteri",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 2,
  },

  {
    id: 150,
    title:
      "Amatara maremare y’ikinyabiziga agomba kutamurika mu bihe bikurikira:",
    options: [
      "iyo umuhanda umurikiwe umuyobozi abasha kureba muri m 200",
      "iyo ikinyabiziga kigiye kubisikana nikindi",
      "iyo ari mu nsisiro",
      "ibisubizo byose nibyo",
    ],

    correctAnswer: 1,
  },

  {
    id: 151,
    title:
      "Ubugari bwa romoruki ikuruwe n’igare cyangwa velomoteri ntiburenza ibipimo bikurikira:",
    options: ["cm 25", "cm 125", "cm 45", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 3,
  },

  {
    id: 152,
    title:
      "Uburyo bukoreshwa kugirango ikinyabiziga kigende gahoro igihe feri idakora neza bwitwa:",
    options: [
      "feri y’urugendo",
      "feri yo guhagarara",
      "feri yo gutabara",
      "Nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 2,
  },

  {
    id: 153,
    title:
      "Nta mwanya n’umwe feri ifungiraho ushobora kurekurana n’ibiziga keretse:",
    options: [
      "iyo bireba feri y’urugendo",
      "iyo kurekurana ari ibyakanya gato",
      "iyo bireba feri yo guhagarara umwanya munini, ubwo kurekurana bikaba bidashoboka bidakozwe n'umuyobozi",
      "byose ni ibisubizo by’ukuri",
    ],

    correctAnswer: 3,
  },

  {
    id: 154,
    title:
      "Ikinyabiziga ntigishobora kugira amatara arenze abiri y’ubwoko bumwe keretse kubyerekeye amatara akurikira:",
    options: [
      "itara ndangamubyimba",
      "itara ryerekana icyerekezo",
      "itara ndangaburumbarare",
      "ibisubizo byose ni ukuri",
    ],

    correctAnswer: 3,
  },

  {
    id: 155,
    title: "Itara ndanganyuma rigomba gushyirwa aha hakurikira:",
    options: [
      "ku nguni y’iburyo y’ikinyabiziga",
      "ku gice cy’inyuma ku kinyabiziga",
      "ahegereye inguni y’ibumoso y’ikinyabiziga",
      "ibisubizo byose ni ukuri",
    ],

    correctAnswer: 2,
  },

  {
    id: 156,
    title:
      "Nibura ikinyabiziga gitegetswe kugira uduhanagurabirahuri dukurikira:",
    options: ["2", "3", "1", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 2,
  },

  {
    id: 157,
    title:
      "Ibiziga by’ibinyabiziga bigendeshwa na moteri n’ibya velomoteri kimwe n’ibya romoruki zabyo bigomba kuba byambaye inziga zihagwa zifite amano n’ubujyakuzimu butari munsi ya milimetero imwe ku migongo yabyo yose, n’ubudodo bwabyo ntibugire ahantu na hamwe bugaragara kdi ntibigire aho byacitse bikomeye mu mpande zabyo. Ariko ibyo ntibikurikizwa ku binyabiziga bikurikira:",
    options: [
      "ibinyabiziga bidapakiye kdi bitajya birenza umuvuduko  wa km 25 mu isaha ahateganye",
      "ibinyabiziga bya police bijya ahatarenga km 25 uvuye aho biba",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 0,
  },
  // ----------------------------------- ------- END OF TEST 8 ----------------------------------------------------

  // ----------------------------------- ------- BEGINNING OF TEST 9 ----------------------------------------------

  {
    id: 158,
    title:
      "Birabujijwe kugenza ibinyabiziga bigendeshwa na moteri na za romoruki zikururwa nabyo, iyo ibiziga byambaye inziga zidahagwa cyangwa inziga zikururuka zifite umubyimba uri hasi ya cm 4. Ariko ibyo ntibikurikizwa ku binyabiziga bikurikira:",
    options: [
      "ku binyabiziga by’ingabo",
      "ibinyabiziga bihinga iyo bigendeshwa mu karere katarenga km 25 uvuye aho ziba",
      "ibinyabiziga bya police",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 1,
  },

  {
    id: 159,
    title:
      "Imirongo yera iteganye n’umurongo ugabanya umuhanda mo kabiri mu burebure bwawo ugaragaza:",
    options: [
      "ahanyurwa n’amagare na velomoteri",
      "ahanyurwa n’ingorofani n’ibinyamitende",
      "ahanyurwa n’abanyamaguru",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 2,
  },

  {
    id: 160,
    title:
      "Iyo harimo indi myanya birabujijwe gutwara ku ntebe y’imbere y’imodoka abana badafite imyaka ikurikira:",
    options: [
      "imyaka 10",
      "imyaka 12",
      "imyaka 7",
      "nta gisubizocy’ukuri kirimo",
    ],

    correctAnswer: 1,
  },

  {
    id: 161,
    title:
      "Iyo ikinyabiziga kitagikora cyangwa cyoherejwe mu mahanga burundu ibyapa ndanga bigomba gukurwaho bikoherezwa mu biro by’imisoro, ibyo bikorwa mu gihe kingana gute:",
    options: [
      "ibyumweru bibiri",
      "amezi abiri",
      "ukwezi kumwe",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 1,
  },

  {
    id: 162,
    title:
      "Inkombe z’inzira nyabagendwa cyangwa z’umuhanda zishobora kugaragazwa n’ibikoresho ngarurarumuri ibyo bikoresho bigomba gushyirwaho ku buryo abagenzi babibona ku buryo bukurikira:",
    options: [
      "babona gusa ibumoso bwabo ibyibara ryera",
      "iburyo babona iby’ibara ritukura cyangwa risa n’icunga rihishije gusa",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 2,
  },

  {
    id: 163,
    title:
      "Iyo kuyobya umuhanda ari ngombwa bigaragazwa kuva aho uhera no kuburebure bwawo n’icyapa gifite ubuso bw’amabara akurikira:",
    options: ["umukara", "umweru", "umutuku", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 3,
  },

  {
    id: 164,
    title:
      "Ku mihanda yagenwe na minisitiri ubifite mu nshingano ibyapa biburira n’ibyapa byerekana bigomba kugaragazwa kuva bwije kugera bukeye n’urumuri rwihariye cyangwa amatara ku mihanda cyangwa ibintu ngarurarumuri. Igihe ijuru rikeye intera y’ahagaragara igomba kuba nibura:",
    options: ["m50", "m120", "m150", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 3,
  },

  {
    id: 165,
    title:
      "Ibizirikisho by’iminyururu cyangwa by’insinga kimwe n’ibindi by’ingoboka bikoreshwa gusa igihe nta kundi umuntu yabigenza kandi nta kindi bigiriwe uretse gusa kugirango ikinyabiziga kigere aho kigomba gukorerwa kandi nturenze na rimwe km 20 mu isaha, ibyo bizirikisho bigaragazwa ku buryo bukurikira:",
    options: [
      "agatambaro gatukura kuri cm 50 z’umuhanda",
      "ikimenyetso cy’itara risa n’icunga rihishije",
      "icyapa cyera cya mpande enye zingana gifite cm 30 kuri buri ruhande",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 2,
  },

  {
    id: 166,
    title:
      "Uretse mu mijyi, kuyindi mihanda yagenywe na minisiteri ushinzwe gutwara ibintu n’abantu, uburemere ntarengwa bwemewe ku binyabiziga bifatanye bifite imitambiko itatu ni:",
    options: ["toni 12", "toni 16", "toni 10", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 0,
  },

  {
    id: 167,
    title:
      "Uretse mu mujyi kuyindi mihanda yajyenwe na minisitiri ushinzwe gutwara abantu n’ibintu, uburemere ntarengwa ku binyabiziga bifite imitambiko itatu cyangwa irenga hatarimo mukuzungu ni :",
    options: ["toni 10", "toni 12", "toni 15", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 3,
  },

  {
    id: 168,
    title:
      "Iyo nta mategeko awugabanya by’umwihariko umuvuduko ntarengwa ku modoka zidafite ibizibuza kwiceka kuberako ariko zakozwe ni:",
    options: [
      "km 70 mu isaha",
      "km 40 mu isaha",
      "km 25 mu isaha",
      "km20 mu isaha",
    ],

    correctAnswer: 2,
  },

  {
    id: 169,
    title:
      "Iyo nta mategeko awugabanya by’umwihariko umuvuduko ntarengwa ku modoka zidafite ibizibuza kwiceka kuberako ariko zakozwe ni:",
    options: [
      "km 20 mu isaha",
      "km 40 mu isaha",
      "km 35 mu isaha",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 170,
    title:
      "Iyo nta mategeko awugabanya by’umwihariko umuvuduko ntarengwa ku modoka zidafite ibizibuza kwiceka kuberako ariko zakozwe ni:",
    options: [
      "km 20 mu isaha",
      "km 40 mu isaha",
      "km 35 mu isaha",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 171,
    title: "Ikinyabiziga kibujijwe guhagarara akanya kanini aha hakurikira :",
    options: [
      "imbere y’ahantu nyabagendwa hinjirwa n’ahasohokerwa n’abantu benshi",
      "mu muhanda aho ugabanyijemo ibisate bigaragazwa n’imirongo icagaguye",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 0,
  },

  {
    id: 172,
    title:
      "Iyo kuva bwije kugeza bukeye cyangwa bitewe n’uko ibihe bimeze nk’igihe cy’ibihu cyangwa cy’imvura bitagishoboka kubona neza muri m 200, udutsiko twose tw’abanyamaguru nk’imperekerane cyangwa udutsiko tw’abanyeshuri bari ku murongo bayobowe n’umwarimu, iyo bagenda mu muhanda ku isonga hakaba hari abantu barenze umwe bagomba kugaragazwa kuburyo bukurikira:",
    options: [
      "imbere ni itara ry’umuhondo ritwariwe ibumoso",
      "inyuma ni itara ryumutuku ritwariwe ibumoso n’umuntu uri ku murongo w’inyuma hafi y’umurongo ugabanya umuhanda mo kabiri",
      "A na B ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 1,
  },

  {
    id: 173,
    title:
      "Imburira zimurika zemerewe gukoreshwa kugirango bamenyeshe umuyobozi ko bagiye kumunyuraho aha hakurikira:",
    options: [
      "mu nsisiro cyangwa ahandi hose",
      "ahegereye inyamaswa zikurura",
      "hafi y’amatungo",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 0,
  },

  {
    id: 174,
    title:
      "Ibinyabiziga bifite ubugari bufite ibipimo bikurikira bigomba kugira amatara ndangaburumbarare",
    options: [
      "metero 3",
      "metero 2 na cm 50",
      "metero 1 na cm 10",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 175,
    title:
      "Nta tara na rimwe cyangwa akagarurarumuri bishobora kuba bifunze kuburyo igice cyabyo cyo hasi cyane kimurika kiba kiri hasi y’ibipimo bikurikira kuva ku butaka igihe ikinyabiziga kidapakiye:",
    options: ["cm 30", "cm 20", "cm 50", "nta gisubizo cy’ukuri kirimo"],

    correctAnswer: 3,
  },

  {
    id: 176,
    title:
      "Ahari hejuru cyane y’ubuso bumurika h’amatara ndangambere na ndanganyuma ntihashobora kuba aharenze ibipimo bikurikira hejuru y’ubutaka iyo ikinyabiziga kidapakiye:",
    options: [
      "m1 na cm 50",
      "m1 na cm 75",
      "m 1 na cm 80",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 3,
  },

  {
    id: 177,
    title:
      "Buri modoka cyangwa buri romoruki ikuruwe n’iyo modoka bishobora kugira itara risa n’icyatsi kibisi bituma umuyobozi yerekana ko yabonye ikimenyetso cy’uwitegura kumunyuraho. Iryo tara rigomba gushyirwa aha hakurikira:",
    options: [
      "hafi y’inguni y’ibumoso bw’ikinyabiziga",
      "inyuma hafi y’impera y’ibumoso bw’ikinyabiziga",
      "inyuma ahegereye inguni y’iburyo",
      "nta gisubizo cy’ukuri kirimo",
    ],

    correctAnswer: 1,
  },

  // start of 10

  {
    id: 178,
    title:
      "Ubugari bw’imizigo yikorewe n’ipikipiki ifite akanyabiziga ko kuruhande kimwe n’ubwa romoruki ikuruwe na bene icyo kinyabiziga ntibushobora kurenza ibipimo bikurikira ku bugari bw’icyo kinyabiziga kidapakiye:",
    options: ["m 1.25", "cm 30 ", "cm 75 ", "nta gisubizo cy’ukuri kirimo"],
    correctAnswer: 1,
  },

  {
    id: 179,
    title: "Mu gihe telefone yawe ihamagawe utwaye imodoka   wakora iki?",
    options: [
      "Kwitaba cyangwa guhagarara ako kanya",
      "kutayitaba",
      "Gushyira imodoka iruhande ukayitaba ",
      "B na c ni ibisubizo byukuri",
    ],
    correctAnswer: 2,
  },
  {
    id: 180,
    title: ".Niki wakora mbere y’uko uhindura icyerekezo?",
    options: [
      "Gutanga ikimenyetso cy’ukuboko no gukoresha amatara ndangacyerekezo",
      "Itegereze neza niba icyapa kikwemerera guhindura icyerekezo.",
      "A na B n’ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },
  {
    id: 181,
    title: "Niki muribi wakwirinda mugihe ushaka kunyuranaho?",
    options: [
      "Nyuma y’ikona ugategereza kubona uburyo bwo kunyuranaho.",
      "Mumuhanda w’icyerekezo kimwe",
      "Aho utagomba kurenza ibirometero 30 mu isaha.",
      "Ugeze mumuhanda utaringaniye neza",
    ],
    correctAnswer: 0,
  },

  {
    id: 182,
    title:
      "Mugihe ukurikiranye na romoruki,n’ukubera iki ugomba gusiga umwanya uhagije hagati yawe nayo?",
    options: [
      "Bituma ubasha gukata ikorosi vuba.",
      "Bifasha umuyobozi wa romoruki kukurebera mundorerwamo.",
      "Bifasha romoruki guhagarara byoroshye.",
      "Bikurinda umuyaga.",
    ],
    correctAnswer: 1,
  },

  {
    id: 183,
    title:
      "Utegereje gukata iburyo kwiherezo ry’umuhanda.ukingirijwe nimodoka ihagaze.niki wakora?",
    options: [
      "Guhagarara hanyuma ukagenda gake gake witonze kugezaho ureba neza.",
      "Kwihuta wegera imbere aho ushobora kureba ugafunga ikindi cyerekezo.",
      "Gutegereza abanyamaguru bakakumenyesha ko ntakibazo wakata.",
      "Guhindukiza imodoka vuba kugirango ushake indi nzira wakoresha.",
    ],
    correctAnswer: 0,
  },

  {
    id: 184,
    title:
      "Mugihe uri murugendo rurerure mumuhanda urombereje w’ibice byinshi.niki wakora mugihe wumva utangiye kugira ibitotsi?",
    options: [
      "Gucuranga umuziki cyane.",
      "Kwihuta cyane kugirango usoze urugendo vuba.",
      "Kuva mumuhanda urombereje w’ibice byinshi, ugahagarara ahantu hatekanye.",
      "Ntagisubizo cy’ukuri kirimo.",
    ],
    correctAnswer: 2,
  },

  {
    id: 185,
    title: "Kuki ugomba gucana amatara mugihe hatangiye kwijima?",
    options: [
      "Kugirango akerekanamuvuduko kagaragare neza.",
      "Kugirango abandi biborohere kukubona.",
      "Kugira ngo ujyane nabandi bayobozi bibinyabiziga.",
      "Kuko amatara yo ku muhanda ari kwaka",
    ],
    correctAnswer: 1,
  },

  {
    id: 186,
    title:
      "Urimo kugenda munzira nyabagendwa ni gute wanyura k’umuyobozi w’igare?",
    options: [
      "Kuvuza ihoni mugihe umunyuraho",
      "Kumunyuraho umwegereye",
      "Gusiga umwanya uhagije  igihe umunyuraho",
      "Kugabanya umuvuduko  mbere y’uko umunyuraho",
    ],
    correctAnswer: 2,
  },

  {
    id: 187,
    title: "Niki wakora igihe utabona neza usubira inyuma ?",
    options: [
      "Kumanura ikirahure cy’imodoka urebe inyuma",
      "Gufungura umuryango  w’imodoka ureba inyuma",
      "Gushaka umuntu uri hanze y’ikinyabiziga akakuyobora",
      "Gukoresha akarebanyuma kakwegereye",
    ],
    correctAnswer: 2,
  },

  {
    id: 188,
    title:
      "Igihe ukurikiwe n’ikinyabiziga gitwara abarwayi  gicanye amatara y’intabaza arabagirana.  Wakora iki ?",
    options: [
      "Kugihigamira ako kanya ndetse  byaba ngombwa ugahagarara",
      "Kongera umuvuduko kugirango ugisige",
      "Kugumana umuvuduko wari ufite",
      "Guhagarara bitunguranye mu muhanda",
    ],
    correctAnswer: 0,
  },

  {
    id: 189,
    title:
      "Wifuza kugana ibumoso imbere yawe. kubera iki ushaka umwanya mwiza kandi uhagije?",
    options: [
      "Kwemerera abandi bayobozi b’ibinyabiziga kugutambukaho",
      "Kugirango ubone neza ikindi kerekezo ushaka gufata",
      "Kugirango ufashe abandi bose bakoresha umuhanda icyo ushaka gukora",
      "Kwemerera abandi bayobozi b’ibinyabiziga  kukunyura muruhande rw’ibumoso",
    ],
    correctAnswer: 2,
  },

  {
    id: 190,
    title:
      "Utwaye ikinyabiziga inyuma ya  romoruki.umuyobozi wayo akaguha ikimenyetso cyo kumutambukaho iburyo kandi ugana  ibumoso, wakora iki ?",
    options: [
      "Kugabanya umuvuduko ukareka akagenda",
      "Gukomeza iburyo bwawe",
      "Kumunyuraho iburyo bwe",
      "Kugumana umuvuduko wari ufite ukamuvugiriza ihoni",
    ],
    correctAnswer: 0,
  },

  {
    id: 200,
    title:
      "Wegereye inzira y’abanyamaguru ugasanga bategereje kwambuka. Ugomba gukora iki?",
    options: [
      "Kureka abakuze n’abafite ubumuga bagatambuka mbere",
      "Kugabanya umuvuduko witegura guhagarara",
      "Gukoresha amatara abamenyesha kwambuka",
      "Gukoresha ibimenyetso byamaboko bibemerera kwambuka",
    ],
    correctAnswer: 1,
  },

  {
    id: 201,
    title:
      "Kumanywa urumuri rudahagije hatabona neza .Ni ayahe matara y’urugendo ugomba gukoresha.",
    options: [
      "Amatara yo kubisika  na matara  kamena-bihu.",
      "Amatara kamena-bihu y’imbere",
      "Amatara yo kubisikana",
      "Amatara kamena-bihu y’inyuma",
    ],
    correctAnswer: 1,
  },

  {
    id: 202,
    title:
      "Niyihe mpamvu ituma  tugomba kugabanya umuvuduko mugihe  hari ibihu?",
    options: [
      "Igihe feri idakora",
      "Igihe uhumishijwe n’amatara yo kubisikana",
      "Igihe moteri imara ngo izime",
      "Nuko biba bitoroshye kubona ikiri imbere",
    ],
    correctAnswer: 3,
  },

  {
    id: 203,
    title: "Niki ugomba gukora igihe uhagaze ku muhanda igihe cy’ibihu?",
    options: [
      "Kureka amatara ndanga akaguma yaka",
      "Kureka amatara yo k,ubisikana na kamena-bihu akaguma yaka",
      "Kureka amatara yo kubisikana akaguma yaka",
      "Kureka amatara y’urugendo akaguma yaka",
    ],
    correctAnswer: 0,
  },

  {
    id: 204,
    title: "Ni hehe byemewe kunyuranaho munzira y’icyerekezo kimwe?",
    options: [
      "ku gisate kiri Ibumoso bw’umuhanda",
      "Kunyuranaho ntibyemewe",
      "Ku gisate kiri iburyo bw’umuhanda gusa",
      "Ku gisate cy’ibumoso cyangwa iburyo",
    ],
    correctAnswer: 0,
  },

  {
    id: 205,
    title:
      "N’uwuhe muntu ushobora gusimbura ibimenyetso byo mumuhanda, dutegetswe kubaha?",
    options: [
      "Umuyobozi w’ikinyamitende",
      "Umunyamaguru",
      "Umukozi ubifitiye ububasha",
      "Umuyobozi wa bisi",
    ],
    correctAnswer: 2,
  },

  {
    id: 206,
    title:
      "Ni iki gikenewe muri ibi bikurikira kugirango ubashe gutwara imodoka mu muhanda  biteganywa nitegeko",
    options: [
      "Uruhushya rwa burundu rwo gutwara ibinyabiziga rugifite agaciro",
      "Ubwishingizi bw’ikinyabizaga bugifite agaciro",
      "Icyemezo cy’iyandikwa ry’ikinyabiziga",
      "Ibisubizo byose nibyo",
    ],
    correctAnswer: 3,
  },

  // start of test 11

  {
    id: 207,
    title:
      "Ikinyabiziga gishya gikenerwa gusuzumwa bwambere nyuma y’igihe kingana iki ?",
    options: [
      "Nyuma y’umwaka umwe",
      "Nyuma y’imyaka ibiri",
      "A na b ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 208,
    title:
      "Ni ryari  ushobora kwakiriza icyarimwe  amatara  yose ndangacyerekezo y’ikinyabiziga ?",
    options: [
      "Mu gihe ushaka kuburira abandi  bakoresha umuhanda",
      "Mu gihe ikinyabiziga cyawe gishobora guteza ibyago",
      "A na b ni ibisubizo by’ukuri",
      "Ntagisubizo cy’ukuri",
    ],
    correctAnswer: 2,
  },

  {
    id: 209,
    title:
      "Ugeze ahabereye impanuka yo mumuhanda bwambere ugasanga abakomeretse bikomeye. wakiriza icyarimwe amatara y’ibyerekezo byombi, niki kindi ushobora gukora?",
    options: [
      "Kumenya neza niba imbangukiragutabara yahamagawe",
      "Guhagarika ibinyabiziga bindi no kubasaba ubufasha",
      "A na b ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 0,
  },

  {
    id: 210,
    title:
      "Wakoze impanuka yo mu muhanda ,  ni ikihe cyangombwa polisi ishobora kugusaba kucyerekana ?",
    options: [
      "Icyemezo cy’iyandikwa ryi ikinyabiziga",
      "Uruhusa rwa burundu  rwo gutwara ikinyabiziga",
      "Uruhushya rwagateganyo",
      "Imikorere y’ikinyabiziga",
    ],
    correctAnswer: 1,
  },

  {
    id: 211,
    title: "Mugihe ikinyabiziga cyacu bakinyuzeho",
    options: [
      "Tugomba kugabanya umuvuduko",
      "Tugomba kongera umuvuduko",
      "Tugomba kongera umuvuduko n’ubwitonzi",
      "Nta gisubizo cy’ ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 212,
    title: "Ntibyemewe gukoresha telephone",
    options: [
      "Mu biro bya leta",
      "Mu biro bya Polisi",
      "Igihe utwaye ikinyabiziga",
      "Ibisubizo byose ni ukuri",
    ],
    correctAnswer: 2,
  },

  {
    id: 213,
    title: "Mbere yo kunyura ku kindi kinyabiziga, ni ngombwa kumenya ko:",
    options: [
      "Nta kindi kinyabiziga kinturutse inyuma",
      "Umuhanda ubona neza, no kwitondera kunyuranaho",
      "Ikinyabiziga kinturutse imbere gishaka gukatira I buumoso",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 214,
    title:
      "Ikindi kinyabiziga kiguturutse inyuma kiguterera amatara y’urumuri rumyasa,  wakora iki?",
    options: [
      "Kongera umuvuduko kugira ngo intera iri hagati yawe n’ukuri inyuma igumeho",
      "Fata feri y’urugendo kugira ngo umwereke ko ugiye guhagarara",
      "Emerera icyo kinyabiziga kugutambukaho niba imbere ntacyago gihari",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 215,
    title:
      "Mu gihe Umuntu ufite ubumuga bwo kutabona yambuka umuhanda yitwaje inkoni yera y’abatabona:",
    options: [
      "Umuyobozi w’ikinyabiziga agomba gufata iyo  nkoni nk’icyapa kimumenyesha ko agomba guhagarara",
      "Vuza ihoni ukomeze",
      "Gabanya nurangiza ukomeze witonze",
      "Ibisubizo byose ni ukuri",
    ],
    correctAnswer: 0,
  },

  {
    id: 216,
    title: "Amatara y’urugendo, mu gihe cy’ibihu:",
    options: [
      "Ni meza kuko atuma ureba kure",
      "Ni mabi kuko arakugarukira akaguhuma amaso",
      "Akwizeza ko abandi bakubona",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 217,
    title: "Gutwara uzungazunga mu muhanda:",
    options: [
      "Ni bibi ku kinyabiziga cy’imitende ibiri",
      "Ni bibi igihe cyose",
      "Ni bibi ku kinyabiziga cy’imitende ine",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 218,
    title: "Telephone ngendanwa ntigomba gukoreshwa:",
    options: [
      "Ahari ibimenyetso bimurika",
      "Igihe utwaye ikinyabiziga Ku muvuduko wa 20km/h",
      "A na B ni ibisubizo by’ukuri",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 3,
  },

  {
    id: 219,
    title: "Kunyuranaho bibujijwe  gusa igihe:",
    options: [
      "Igihe mu muhanda hagati hashushanyijemo umurongo w’umweru  ucagaguye.",
      "Umuhanda ushushanyijwemo umurongo wera udacagaguye",
      "Ikinyabiziga gitwawe ku musozi unyerera",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 220,
    title:
      "Mu gihe utwaye ikinyabiziga ni joro ucanye amatara maremare ugahura n’ikindi kinyabiziga giturutse mu kindi cyerecyezo:",
    options: [
      "Gukomeza ibumoso",
      "Kuzimya ucana amatara maremare n’amagufi",
      "Kuzimya amatara maremare kugeza ikindi kinyabiziga gitambutse",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 221,
    title:
      "Igihe umuyobozi w’inyamaswa, afite inyamaswa idatuje, asaba ko ibinyabiziga bihagarara:",
    options: [
      "Umuyobozi w’ikinyabiziga agomba guhagarara",
      "Umuyobozi w’ikinyabizigaagomba kuvuza ihoni  agukomeza",
      "Umuyobozi w’ikinyabiziga agomba kugabanya umuvuduko",
      "Ibisubizo byose ni ukuri",
    ],
    correctAnswer: 0,
  },

  {
    id: 222,
    title: "Iyo mu muhanda hashushanyijemo umurongo wera ucagaguye, ntugomba",
    options: [
      "Ntugomba kujya mu kindi gice cy’umuhanda",
      "Ushobora kujya mu kindi gice cy’umuhanda bibaye ngombwa",
      "Agomba guhagarika ikinyabiziga",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 282,
    title:
      "Iyo itara ry’umuhondo rimyatsa rikoreshejwe mu masangano y’amayira ahwanyije agaciro rishyirwa ahagana he:",
    options: [
      "Kuri buri nzira",
      "Hagati y’amasangano",
      "Iburyo bw’amasangano",
      "a na b ni ibisubizo by’ ukuri",
    ],
    correctAnswer: 3,
  },

  {
    id: 223,
    title: "Kuvuza ihoni bibujijwe:",
    options: [
      "Ku musigiti, ku rusengero, ku rutambiro",
      "Hafi y’ibitaro",
      "Hafi y’ubuyobozi bwa polisi",
      "Nta gisubizo cy’ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 224,
    title: "Icyemezo cy’Isuzuma ry’ikinyabiziga kimara igihe kingana iki?",
    options: [
      "Amezi 6 kubinyabiziga bikora ubucuruzi",
      "Amezi 12 ku binyabiziga  bidakora ubucuruzi",
      "Imyaka 2",
      "A na B ni ibisubizo by’ukuri",
    ],
    correctAnswer: 3,
  },

  {
    id: 225,
    title:
      "Niki umuyobozi w’ikinyabiziga yakora mu gihe abonye icyapa kiburira cya mpande eshatu gitukura mu muhanda?",
    options: [
      "Hagarara utegereze amabwiriza",
      "Umuyobozi w’ikinyabiziga agomba kugabanya umuvuduko ateganya icyago imbere ye",
      "Kukireka, ukagumana umuvuduko ufite ugakomeza",
      "Hagarara kuri icyo cyapa cya mpande eshatu mbere yo gukomeza",
    ],
    correctAnswer: 1,
  },

  {
    id: 226,
    title:
      "Niki umuyobozi w’ikinyabiziga agomba gukora ahuye n’amatungo mu muhanda?",
    options: [
      "Kuvuza ihoni kugirango zihunge",
      "Umuyobozi w’ikinyabiziga agomba kugabanya umuvuduko zigatambuka",
      "Kwatsa amatara maremare  kugirango utambuke wihuta mu buryo bushoboka bwose",
      "Kuvuza ihoni ukanyuraho witonze",
    ],
    correctAnswer: 1,
  },

  // start of test12

  {
    id: 227,
    title:
      "Niki umuyobozi w’ikinyabiziga yakora abonye otobisi iri kuva aho zagenewe guhagararwamo?",
    options: [
      "Gukomeza iruhande kuko ufite uburenganzira bwo gukomeza",
      "Gabanya umuvuduko maze ureke ikomeze",
      "Gerageza unyureho  kugirango atagutinza",
      "Menyesha umuyobozi wa otobisi aguhe inzira",
    ],
    correctAnswer: 1,
  },

  {
    id: 228,
    title:
      "Niki umuyobozi w’ikinyabiziga yakora mugihe ahuye n’ikinyabiziga cyakije  itara ry’umuhondo rimyatsa?",
    options: [
      "Mu gihe ikinyabiziga giturutse mu kindi cyerekezo kitagishoboye kugenda",
      "Mu gihe ikinyabiziga ndakumirwa  giturutse  mu kindi cyerekezo",
      "Mu gihe ikinyabiziga  giturutse mu cyindi cyerekezo cy’ihuta",
      "Kugabanya umuvuduko witegura guhagarara",
    ],
    correctAnswer: 3,
  },

  {
    id: 229,
    title:
      "Umuyobozi w’ikinyabiziga yakora iki mu gihe anyuzweho nikindi kinyabiziga?",
    options: [
      "Gukomezanya umuvuduko warufite",
      "Kujya i buryo",
      "Kujya i bumoso",
      "Kwongera umuvuduko",
    ],
    correctAnswer: 0,
  },

  {
    id: 230,
    title:
      "Umuyobozi w’ikinyabiziga ugeze mu isangano ry’umuhanda ugenzurwa ni ibimenyetso by’amatara yaka agasanga ataka (adakora), yakora iki?",
    options: [
      "Guca  mu isangano n’ubwitonzi nkaho ntakimenyetso kikuyobora kirimo, witondera abandi bayobozi b’ibinyabiziga",
      "Gutwara neza ntagutinda mw’isangano",
      "Guhagarara mw’isangano no guha inzira abayobozi b’ibinyabiziga baturuka iburyo bwawe",
      "Gucana amatara yose ndanga cyerekezo  ugakomeza ",
    ],
    correctAnswer: 0,
  },

  {
    id: 231,
    title:
      "Ni iki umuyobozi w’ikinyabiziga yakora ahuye n’ishyo ry’amatungo munzira nyabagendwa?",
    options: [
      "Kuvuza ihoni kugirango ayo matungo  atambuke",
      "Umuyobozi w’ikinyabiziga agomba kugabanya umuvuduko no gutambukana ubwitonzi",
      "Kwatsa amatara maremare n’amagufi no gutambuka vuba bishoboka",
      "Kuvuza ihoni no gutambukana ubwitonzi",
    ],
    correctAnswer: 1,
  },

  {
    id: 232,
    title:
      "Umuyobozi w’ikinyabiziga yakora iki igihe ageze ku  kazamuko gashinze cyane ?",
    options: [
      "Umuyobozi w’ikinyabiziga agomba kugabanya umuvuduko akaguma kuruhande rw’iburyo yirinda  ibyago",
      "Gukandagira ikirenge cya amburiyage no  kuvuza ihoni ryo kumunyesha",
      "Kugumana umuvuduko n’ikirekezo wari ufite mu muhanda",
      "Guhagarara ku mpera zuwo musozi",
    ],
    correctAnswer: 0,
  },

  {
    id: 233,
    title:
      "Umuyobozi w’ikinyabiziga yakora iki ahuye n’ikinyabiziga  giturutse mukindi kerekezo, gicanye amatara  yumuhondo aburira ?",
    options: [
      "Umuyobozi w’ikinyabiziga agomba kugabanya umuvuduko no gutambukana ubwitonzi",
      "Ikinyabiziga cy’ubutabazi",
      "Yagize ibyago",
      "Umuvudoko urenze ",
    ],
    correctAnswer: 0,
  },

  {
    id: 234,
    title:
      "Niki umuyobozi w’ikinyabiziga yakora ageze hafi y’inzira ifunganye  igihe ahuye n’ikindi kinyabiziga giturutse mukindi cyerekezo?",
    options: [
      "Agomba kuguma mumwanya yarimo agategereza gutambuka kwikindi kinyabiziga",
      "kugabanya umuvuduko no gusiga umwanya uhagije hagati y’ibinyabiziga byombi",
      "gutegereza ko undi muyobozi w’ikinyabiziga ava mu muhanda ",
      "gutwarira ikinyabiziga mu muhanda hagati kugirango abandi bayobozi bahagararare ",
    ],
    correctAnswer: 1,
  },

  {
    id: 235,
    title:
      "Umuyobozi w’ ikinyabiziga  agendera inyuma y’ikindi kinyabizaga  akaba adateganya kukinyuraho  yakora iki ?",
    options: [
      "kuguma yicyo kinyabiziga hagati mu muhanda",
      "kuguma inyuma yacyo kugirango yemerere ibindi binyabiziga gutambuka",
      "gutwarira inyuma ye umwegereye cyane kugirango  ureke ibindi binyabiziga bibanyureho",
      "gutanga ibimenyetso kubindi binyabiziga ko byabanyuraho",
    ],
    correctAnswer: 1,
  },

  {
    id: 236,
    title:
      "Niryari amatara ndanga cyerekezo agomba kugaragazwa  kubandi bakoresha  umuhanda ?",
    options: [
      "igihe gusa ari ngombwa  amenyesha ibindi binyabiziga bimukurikiye ",
      "igihe gusa aringombwa kuburira abandi bayobozi bava mukindi cyerekezo",
      "mugihe gikwiye ushaka kumenyesha abandi bakoresha umuhanda icyo ugiye gukora",
      "keretse ahari  ibimenyetso byo mu muhanda byerekana icyerekezo cyawe",
    ],
    correctAnswer: 2,
  },

  {
    id: 237,
    title:
      "Gutinda gutanga ibimenyetso  ku muyobozi w’ikinyabiziga  ni gute bibangamira  abandi  bakoresha umuhanda ?",
    options: [
      "bigira ingaruka gusa kubaturuka mukindi cyerekezo",
      "bishobora gutuma batabona igihe gihagije cyo gushyira mubikorwa  icyo amenyeshejwe",
      "baba bafite igihe gihagije cyo gushyira mu bikorwa ibyo bamyeshejwe",
      "ntacy bibabangamiraho ",
    ],
    correctAnswer: 1,
  },

  {
    id: 238,
    title:
      "Ni ubuhe buryo bwiza bwakurikizwa igihe hari umuntu wakomerekeye mu mpanuka yo mu muhanda ?",
    options: [
      "Ku mushyira kunkengero y’umuhanda",
      "Kutamukuramo keretse mugihe hari ibyago byaterwa n’inkogi y’umuriro   cyangwa akaba ashobora kugongwa n’ikindi kinyabiziga no guhamagara ababishinzwe ",
      "Gusaba uwakomeretse kunyeganyeza ibice by’umubiri  kugirano umenye aho ibikomere bye bigarukira",
      "Guhumuriza  uwakometse ukamuha ikinyobwo  gikonje",
    ],
    correctAnswer: 1,
  },

  {
    id: 239,
    title:
      "Niki umuyobozi w’ikinyabiziga yakora  igihe agize uruhare mu mpanuka yo mu muhanda , aho ntawakometese  ariko ibinyabiziga bikaba  byateza icyago cyangwa byafunze umuhanda ?",
    options: [
      "Gushushanya aho  zagonganiye no kuzishyira kuruhande",
      "Gukuramo abagenze ugashyiraho icyapa cya mpandeshatu girukura kumodoka",
      "Gutegereza ko abapolisi bahagera mbere yo gukura ibinyabiziga mu muhanda",
      "Guhagarika ibindi binyabiziga kugeza ikibazo gikemutse mukabona kubikura mu muhanda",
    ],
    correctAnswer: 0,
  },

  {
    id: 240,
    title:
      "Igihe umuyobozi w’ikinyabiziga agendera munzira y’icyerekezo kimwe akifuza gukata ibumoso yakora iki?",
    options: [
      "gutwara yegera umurongo wo hagati mu muhanda yerekeza ibumoso",
      "gutwara yegera uruhande rw’iburyo bw’umuhanda",
      "gutwara yegera ku  uruhande rw’ibumoso bw’umuhanda ",
      "Gutwarira hafi y’umurongo ugabanya umuhanda mo kabili",
    ],
    correctAnswer: 2,
  },

  {
    id: 241,
    title:
      "Umuyobozi w’ikinyabizaga uri kugendera  mu muhanda w’ibyerekezo bibiri nuruhe ruhande rw’umuhanda agomba gukoresha ?",
    options: [
      "uruhande rw’ibumoso bw’umuhanda uretse  igihe atawaye imashini zihinga cyangwa zikoreshwa indi mirimo",
      "Mu  gice cy;umuhanda yumva ashaka ",
      "Mu gice cy’iburyo bw’umuhanda  uretse igihe ashaka kunyuranaho cyangwa gukata ibumoso",
      "Ku ruhande rw’ibumoso bw’umuhanda ",
    ],
    correctAnswer: 2,
  },

  {
    id: 242,
    title:
      "Igihe umuyobozi w’ikinyabiziga atwaye mu muhanda urombereje w’ibice byinshi  agomba kugendera mu kihe gice   cy’umuhanda?",
    options: [
      "Kugendera mugice icyo aricyo cyose kirimo ibinyabiziga bike",
      "Kugendera kugice cy’ibumoso  keretse ushaka gusohokera iburyo",
      "Kugendera mu gice cy’iburyo bw’umuhanda keretse ushaka kunyuranaho",
      "Ntagutwarira  mu ruhande rw’iburyo bw’umuhanda kuko hagenewe imodoka ziremereye  n’imodoka  nini zitwara abantu.",
    ],
    correctAnswer: 2,
  },

  {
    id: 243,
    title:
      "Umuyobozi w’ikinyabiziga yakora iki igihe ageze aho banyura bazenguruka?",
    options: [
      "Tanga inzira ku binyabiziga byamaze kwinjira aho banyura bazunguruka",
      "Tanga  inzira  kubinyabiziga biremereye gusa",
      "Tanga inzira gusa  niba uri munzira ya kabiri niya gatatu isohoka ",
      "Komeza kuko abandi bayobozi b’ibinyabiziga  bagomba kuguha inzira  yo gukomeza",
    ],
    correctAnswer: 0,
  },

  {
    id: 244,
    title:
      "Ni kihe cyerekezo umuyobozi w’ikinyabiziga yinjiriramo iyo ageze aho banyura bazenguruka?",
    options: [
      "ibumoso",
      "ibumoso gusa igihe ayobowe ni kimenyetso kimurika",
      "iburyo cyangwa ibumoso",
      "iburyo",
    ],
    correctAnswer: 3,
  },

  {
    id: 245,
    title:
      "Umuyobozi w’ikinyabiziga yakwitondera iki mbere yuko y’injira  munzira  banyuramo bazengurutse?",
    options: [
      "ibinyabiziga bimuturuka inyuma umuvuduko bifite n’uburyo bimwegereye",
      "ibinyabiziga biturutse ibumoso bwe n’umuvuduko bifite n’intera iri hagati ye nabyo",
      "ibinyabiziga biturutse iburyo n’umuvuduko bifite  ni intera iri hagati ye nabyo",
      "ibinyabiziga bimututse imbere , umuvuduko bifite n’intera iri hagati ye nabyo",
    ],
    correctAnswer: 1,
  },

  {
    id: 246,
    title:
      "Umuyobozi w’ikinyabiziga ugendera inyuma y’ikinyabaziga gitwara abagenzi  gihagaze gikuramo cyangwa gishyiramo abagenzi agomba:",
    options: [
      "kunyuranaho ibumoso",
      "gutegereza yihanganye",
      "a na b ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 247,
    title: "Igihe ubonye icyapa  kigaragaza ishuli wakora iki?",
    options: [
      "kugabanya umuvuduko no gukomeza witonze",
      "gukomeza n’umuvuduko uri hejuru  kuko umunyeshuli  agomba gutegereza",
      "kuvuza ihoni",
      "ibisubizo byose ni ukuri ",
    ],
    correctAnswer: 0,
  },

  {
    id: 248,
    title: "Umubare w’abagenzi bemewe gutwarwa mukinyabiziga  wanditswe mu :",
    options: [
      "icyemezo cy’iyandikwa ry’ikinyabiziga",
      "inyemezabwishyu y’umusoro",
      "ubwishingizi",
      "ibisubizo byose ni ukuri",
    ],
    correctAnswer: 2,
  },

  {
    id: 249,
    title: "Gutwara ikinyabiziga wasinze:",
    options: [
      "biremewe kubinyabiziga byabikorera kugiti cyabo ",
      "biremewe  nijoro",
      "birabujijwe ku binyabiziga byose  bifite moteri",
      "ibisubizo byose nibyo",
    ],
    correctAnswer: 2,
  },

  {
    id: 250,
    title: "Umuyobozi w’ikinyabizaga ashobora kunyuranaho:",
    options: [
      "ahamanuka",
      "igihe umuhanda ari mugari",
      "igihe umuyobozi w’ikinyabiziga kiri imbere ye amweretse ikimenyetso kimwemerera kunyuranaho",
      "nta gisubizo cy’ukuri",
    ],
    correctAnswer: 2,
  },

  {
    id: 251,
    title:
      "Ugeze ahari inzira yabanyamaguru barindiriye kwambuka. batangiye kwambuka , wakora iki?",
    options: [
      "kuvuza ihoni",
      "kwihangana ugatagereza",
      "gukomeza",
      "nta gisubizo cy’ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 152,
    title:
      "Igihe utwaye umuntu mu kinyabiziga cyawe, akibagirwa kwambara umukandara  wo kwirinda ibyago  ugomba:",
    options: [
      "gukuramo  umukandara  wo kwirinda ibyago wambaye mukawambara mwembi",
      "kubyerengagiza wizeyeko  nta mpanuka muri bukore",
      "funga cyane umukandara wo kwirinda ibyago wawe",
      "Kubibutsa kwambara umukandara wo kwirinda ibyago",
    ],
    correctAnswer: 3,
  },

  {
    id: 253,
    title:
      "Igihe za otobisi zigenewe gutwara  banyeshuli zihagaze kugirango zibafate cyangwa bavemo  ugomba :",
    options: [
      "kuvuza ihoni ugakomeza",
      "gukomeza ugabanyije umuvuduko n’ubwitonzi  kuko bishoboka ko abanyeshuli bakwambuka bitunguranye",
      "nta bwitonzi budasnzwe bukenewe",
      "ibisubizo byose ni ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 254,
    title: "Igihe imodoka iparitse ku nkengero z’umuhanda  mugihe cy’ ijoro :",
    options: [
      "Imodoka igomba kuba ifunze",
      "Umuntu ufite uruhushya rwo gutwara ikinyabiziga agomba kuba yicaye mu mwanya w’umuyobozi",
      "Amatara yo guhagarara  umwanya munini aguma yaka",
      "Ibisubizo byose ni ukuri",
    ],
    correctAnswer: 2,
  },

  {
    id: 255,
    title:
      "Mu gihe hari undi muyobozi  w’ikinyabiziga ugukurikiye yatangiye kukunyuraho :",
    options: [
      "Ntugomba kugira undi muyobozi w’ikinyabiziga  unyuraho",
      "Ugomba kunyura ku kindi kinyabiziga",
      "Ugomba kunyura kukindi kinyabiziga uvugije ihoni",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 256,
    title:
      "Utwaye ikinyabiziga mu muhanda ufite ibyerekezo bibiri .ikinyabiziga imbere yawe cyiragenda buhoro, imbere yawe umuhanda  nta kibazo kunyuranaho, ugomba :",
    options: [
      "kucyinyuraho bikorewe ibumoso",
      "kucyinyuraho bikorewe iburyo",
      "kucyinyuraho ukoresheje uruhande  urwo arirwo rwose",
      "ibisubizo byose ni ukuri",
    ],
    correctAnswer: 0,
  },

  {
    id: 257,
    title:
      "Ibice by’umuhanda byera bigari biteganye n’umurongo ugabanya umuhanda mo ,kabiri bisobanura:",
    options: [
      "guhagara kw’ikinyabiziga",
      "aho abanyamaguru bambukira",
      "guha  ubushobozi  binyabiziga",
      "ibisubizo byose ni ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 258,
    title: "Uturebanyuma dukoreshwa:",
    options: [
      "kwireba",
      "kugenzura ibigendera mu muhanda inyuma",
      "kureba abicaye inyuma",
      "ntagisubizo cy’ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 259,
    title:
      "Kuki abanyamaguru batemerewe kwambuka umuhanda mw’ikoni cyangwa hafi y’imodoka ihagaze?",
    options: [
      "ingaruka kubindi binyabiziga",
      "ingaruka kubandi bakoresha umuhanda",
      "Abandi bayobozi bi binyabiziga baza bashobora kutabona abambuka umuhanda",
      "Ibisubizo byose ni ukuri",
    ],
    correctAnswer: 2,
  },

  {
    id: 260,
    title: "Kunyuranaho mw’ikoni :",
    options: [
      "biremewe",
      "ntibyemewe",
      "biremewe ukoranye ubwitonzi",
      "ibisubizo byose ni ukuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 261,
    title:
      "Umuyobozi w’ikinyabiziga igihe atwaye ikinyabiziga  akagira umunaniro utuma  yasinzira yakora iki ?",
    options: [
      "Gufungura ikirahure cy’ikinyabiziga cyangwa gushyira ubukonje mu modoka  kugirango umwuka mwiza winjire mu kinyabiziga",
      "Guhagarara akaruhuka  harimo no kugendagenda niba bishoboka",
      "Kunanura amaboko no gufunga amaso mugihe gito",
      "Kongera ubushyuhe mu kinyabiziga",
    ],
    correctAnswer: 1,
  },

  {
    id: 262,
    title:
      "Niki umuyobozi w’ikinyabiziga yakora igihe atwaye ikinyabiziga mugihe cy’ibihu,imvura nyinshi, umwuzure  cyangwa umukungugu mwinshi ?",
    options: [
      "Kugendera mu tuyira turi kumpande zu muhanda, ucunga ibimenyetso  bigarura urumuri",
      "Kugabanya umuvuduko hanyuma ugakoresha amatara magufi",
      "Gucana amatara  maremare  hanyuma ukagenda gahoro",
      "Kugendera mu murongo ugabanya umuhanda mo kabiri unareba ibimenyestso by’umuhanda bigarura urumuri",
    ],
    correctAnswer: 1,
  },

  {
    id: 263,
    title:
      "Muri ibi byapa ni ubuhe bwoko bw’ibyapa bitegeka  byo   mu muhanda?",
    options: [
      "ibiri mw’ishusho y’urukiramende  n’umuzenguruko w’umuhondo",
      "ibiri  mw’ishusho ya mpande eshatu mu n’uzenguruko mw’ibara ry’ubururu",
      "ibiri mw’ishusho y’uruziga n’umuzenguruko mw’ibara ry’umutuku",
      "ibiri mw’ishusho ya mpande enye  zingana mubuso bw’umukara",
    ],
    correctAnswer: 2,
  },

  {
    id: 264,
    title:
      "Amatara ndangacyerekezo agomba kugaragara nijoro igihe ijuru rikeye mu ntera nibura ya:",
    options: ["m 100", "m 200", "m150", "m250"],
    correctAnswer: 2,
  },

  {
    id: 265,
    title:
      "Umurongo ucagaguye uvuga ko buri muyobozi abujijwe kuwurenga uretse mu gihe:",
    options: [
      "Agomba kunyura ku kindi kinyabiziga",
      "Gukatira ibumoso",
      "Guhindukira cyangwa kujya mukindi gice cy’umuhanda",
      "Ibi bisubizo byose nibyo",
    ],
    correctAnswer: 3,
  },

  {
    id: 266,
    title:
      "Igice cy’inzira nyabagendwa kigarukira kumirongo ibiri yera icagaguye ibangikanye kandi gifite ubugari   budahagije kugirango imodoka zitambuke neza kiba ari:",
    options: [
      "Inzira y’abanyamaguru",
      "Agahanda k’amagare",
      "a na b byose ni ukuri",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  // start of test 14

  {
    id: 267,
    title: "Icyapa kimenyesha kugendera mu muhanda ubisikanirwamo gifite:",
    options: [
      "Ishusho y’uruziga mw’ibara ritukura, ubuso bwera n’ikirango cy’umukara",
      "Ishusho ya mpandeshatu mw’ibara ritukura, ubuso bwera n’ikirango cy’umukara",
      "Ishusho ya mpandeshatu mw’ibara ritukura, ubuso bw’ubururu n’ikirango cy’umukara",
      "Ishusho y’uruziga mw’ibara ritukura, ubuso bw’ubururu n’ikirango cy’umukara",
    ],
    correctAnswer: 1,
  },

  {
    id: 268,
    title:
      "Ikinyabiziga kigendeshwa na moteri n’ikinyabiziga gikururwa n’inyamaswa ntibishobora  gukurura :",
    options: [
      "Ibinyabiziga birenze kimwe",
      "Ibinyabiziga bipakiye birenze bibiri",
      "Ibinyabiziga birenze bibiri",
      "b na c ni byo",
    ],
    correctAnswer: 2,
  },

  {
    id: 269,
    title:
      "Umuyobozi ubonye ko hari undi umukurikiye ashaka kumunyuraho agomba kubahiriza ibi bikurikira :",
    options: [
      "kwegera i ruhande rw’iburyo bw’umuhanda",
      "kongera umuvuduko",
      "guhagarara",
      "a na  c ni byo bisubizo by’ukuri",
    ],
    correctAnswer: 0,
  },

  {
    id: 270,
    title:
      "Iyo umuhanda ugabanijemo ibisate bibiri kandi ugendwamo mu byerekezo byombi umuyobozi abujijwe :",
    options: [
      "kugendera mu gisate cy’iburyo",
      "kunyuranaho",
      "kugendera mu gisate cy’ibumoso",
      "ibisubizo byose ni byo",
    ],
    correctAnswer: 2,
  },

  {
    id: 271,
    title: "Icyapa kimenyesha kugendera mu muhanda ubisikanirwamo gifite:",
    options: [
      "Ishusho y’uruziga mw’ibara ritukura, ubuso bwera n’ikirango cy’umukara",
      "Ishusho ya mpandeshatu mw’ibara ritukura, ubuso bwera n’ikirango cy’umukara",
      "Ishusho ya mpandeshatu mw’ibara ritukura, ubuso bw’ubururu n’ikirango cy’umukara",
      "Ishusho y’uruziga mw’ibara ritukura, ubuso bw’ubururu n’ikirango cy’umukara",
    ],
    correctAnswer: 1,
  },

  {
    id: 272,
    title: "Icyapa cyerekana inzira y’amatungo itegetswe giteye:",
    options: [
      "Uruziga mubuso bw’ubururu, ishusho y’inka mu ibara ry’umukara",
      "Uruziga mu ibara ryera, ishusho y’inka mwibara ry’ubururu",
      "Uruziga mu buso bw’ibara ry’ubururu, ishusho y’inka mu ibara ryera n’ikirango cy’umukara",
      "mpande eshatu  mu buso bw’ibara ry’umweru  n’ishusho y’inka mu ibara ry’umukara",
    ],
    correctAnswer: 3,
  },

  {
    id: 273,
    title: "Icyapa cyerekana ko bibujijwe kuvuza amahoni  kirangwa na :",
    options: [
      "ishusho y’uruziga, ubuso bw’ubururu, ikiranga cy’umukara",
      "ishusho y’uruziga, ubuso bw’ubururu, ikiranga cy’umweru",
      "ishusho y’uruziga, ubuso bw’umweru, ikiranga cy’umukara",
      "ntagisubizi cy’ukuri kirimo",
    ],
    correctAnswer: 2,
  },

  {
    id: 274,
    title: "Ibyapa biburira nibyo gutambuka mbere birangwa:",
    options: [
      "ishusho mpandeshatu mw’ibara ritukura , ubuso bwera n’ ikiranga mu ibara ry’umukara",
      "ishusho mpandeshatu mw’ibara ritukura,ubuso bw’ubururu n’ikiranga mu ibara ry’umukara",
      "ishusho y’uruziga mw’ibara ritukura,ubuso bw’ubururu n’ikiranga mu ibara ry’umukara",
      "ishusho y’uruziga mw’ibara ritukura,ubuso bwera n’ikiranga mu ibara ry’umukara",
    ],
    correctAnswer: 0,
  },

  {
    id: 275,
    title: "Ibyapa bibuza n’ibitegeka bikurikizwa gusa :",
    options: [
      "Mumasangano",
      "mu bimenyetso bimurika",
      "a na b ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },

  {
    id: 276,
    title: "Ibyapa biburira bibereyeho kumenyesha umugenzi :",
    options: [
      "ko hari icyago",
      "icyago kidasobanuye ukundi",
      "imiterere y’icyago gitunguranye",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 0,
  },

  {
    id: 277,
    title: "Ibyapa by’inyongera bishobora kumenyesha",
    options: [
      "ibitegetswe byihariye gusa",
      "ubugerure cyangwa amarengamategeko rusange cyangwa ibibujijwe ndetse n’ibitegetswe byihariye",
      "a na b ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  {
    id: 278,
    title: "Ishusho y’icyapa kivuga’’ugukikira”bitegetswe ni :",
    options: [
      "mpandeshatu",
      "uruziga",
      "urukiramende",
      "nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 1,
  },

  {
    id: 279,
    title: "Icyapa kivuga “icyerekezo gitegetswe”kigizwe n’ikirango cy’ibara :",
    options: ["umweru", "umutuku", "ubururu n’ikirango cy’umweru", "umukara"],
    correctAnswer: 2,
  },

  {
    id: 280,
    title: "Ibinyabiziga bikurikira bigomba gukorerwa isuzumwa buri mwaka:",
    options: [
      "Ibinyabiziga bigenewe gutwara abagenzi muri rusange",
      "Ibinyabiziga bigenewe gutwara ibintu birengeje toni 3.5",
      "Ibinyabiziga bigenewe kwigisha gutwara",
      "Nta gisubizo cy’ukuri kirimo",
    ],
    correctAnswer: 3,
  },
];


// new Questions
