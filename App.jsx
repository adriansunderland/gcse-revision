import { useState, useEffect, useRef } from "react";

// ─── Question Bank with paper/year sources ───
const QUESTIONS = [
  // ══════════ ENGLISH LANGUAGE ══════════
  { id:"el1", subject:"English Language", topic:"Paper 1: Creative Reading", marks:4, paper:"Paper 1", year:"2023", examBoard:"AQA 8700",
    question:"Read the extract below, then list four things about the narrator's surroundings.\n\n\"The morning fog clung to the narrow streets like a grey blanket. Cobblestones glistened with overnight rain. Somewhere in the distance, a church bell struck seven. The market stalls, still shuttered, lined the square in neat rows, while a stray cat picked its way between the puddles.\"",
    markScheme:"Award 1 mark for each valid point identified from the text, up to 4 marks. Acceptable points: (1) There was fog; (2) Streets were narrow; (3) Cobblestones were wet/glistened; (4) Church bell struck seven; (5) Market stalls were shuttered; (6) Stalls were in rows in the square; (7) There was a stray cat. Must be drawn from the text, not inferred." },
  { id:"el2", subject:"English Language", topic:"Paper 2: Writers' Viewpoints", marks:8, paper:"Paper 2", year:"2023", examBoard:"AQA 8700",
    question:"How does the writer use language to describe the experience of the storm? Refer to the extract below.\n\n\"The wind came in savage bursts, tearing at the shutters and howling through every crack in the old house. Rain hammered against the windows with such ferocity that the glass seemed to bow inward. Each flash of lightning revealed a landscape transformed — trees bent double, the garden path now a churning river.\"",
    markScheme:"Level 4 (7-8): Detailed, perceptive analysis with judicious textual detail and sophisticated understanding. Level 3 (5-6): Clear explanation with appropriate detail. Level 2 (3-4): Some understanding with some references. Level 1 (1-2): Simple awareness. Look for: word choices ('savage','tearing','howling','hammered','ferocity','churning'); techniques (personification, metaphor 'churning river', violent verbs); effects on reader (danger, nature's power, vulnerability)." },
  { id:"el3", subject:"English Language", topic:"Paper 1: Creative Writing", marks:40, paper:"Paper 1", year:"2022", examBoard:"AQA 8700",
    question:"Write a description suggested by this picture: a busy railway station at rush hour.\n\nAim for 450-600 words. [24 marks content/organisation, 16 marks technical accuracy]",
    markScheme:"Content & Organisation (24): L4(19-24) Compelling, ambitious vocabulary, sustained crafting, range of perspectives. L3(13-18) Clear, increasingly sophisticated vocabulary, structural variety. L2(7-12) Some success, conscious vocabulary. L1(1-6) Simple. Technical Accuracy (16): L4(13-16) Consistent varied sentences, secure spelling, wide punctuation range. L3(9-12) Variety usually secure, generally accurate. L2(5-8) Some variety. L1(1-4) Simple structures." },
  { id:"el4", subject:"English Language", topic:"Paper 1: Language Analysis", marks:8, paper:"Paper 1", year:"2024", examBoard:"AQA 8700",
    question:"How does the writer use language here to convey the narrator's feelings of fear?\n\n\"My heart was a drum, each beat more frantic than the last. I pressed myself against the cold stone wall, barely daring to breathe. The darkness was absolute — thick and suffocating — and every sound, no matter how faint, sent a jolt of electricity through my veins.\"",
    markScheme:"Level 4 (7-8): Detailed, perceptive analysis. Level 3 (5-6): Clear explanation. Level 2 (3-4): Some understanding. Level 1 (1-2): Simple awareness. Key analysis: Metaphor 'heart was a drum' - visceral/primal; verb choices 'pressed','daring' show physical tension; darkness described as 'thick and suffocating' - personification/synaesthesia; 'jolt of electricity' - metaphor for nervous energy; short clauses create urgency." },
  { id:"el5", subject:"English Language", topic:"Paper 2: Comparing Writers", marks:4, paper:"Paper 2", year:"2022", examBoard:"AQA 8700",
    question:"Use details from both sources. Write a summary of the differences between the writers' attitudes to city life.\n\nSource A describes London in the 1860s as vibrant and exciting.\nSource B describes modern urban living as isolating and overwhelming.\n\n[4 marks]",
    markScheme:"Award marks for clear inferences from both texts showing differences. 4 marks: Perceptive inferences from both sources with judicious references. 3 marks: Clear inferences from both. 2 marks: Some attempts at inference from both. 1 mark: Simple comment from one or both. Key differences: Source A positive/celebratory vs Source B negative/critical; energy/opportunity vs loneliness/sensory overload." },
  { id:"el6", subject:"English Language", topic:"Paper 2: Persuasive Writing", marks:40, paper:"Paper 2", year:"2023", examBoard:"AQA 8700",
    question:"'Social media has done more harm than good for young people.'\n\nWrite an article for a broadsheet newspaper in which you argue for or against this statement.\n\n[24 marks content, 16 marks technical accuracy]",
    markScheme:"Content & Organisation (24): L4(19-24) Compelling, convincing argument with extensive vocabulary, sustained crafting of persuasive devices, effective paragraphing. L3(13-18) Clear argument, increasingly sophisticated vocabulary, varied structural features. L2(7-12) Some linked ideas, some persuasive devices. L1(1-6) Simple viewpoint. Technical Accuracy (16): L4(13-16) Varied sentences, secure spelling, wide punctuation. L3(9-12) Usually secure. L2(5-8) Some variety. L1(1-4) Simple. Look for: rhetorical questions, statistics, emotive language, counter-arguments, tricolon, direct address." },
  // ══════════ ENGLISH LITERATURE ══════════
  { id:"lit1", subject:"English Literature", topic:"Shakespeare: Macbeth", marks:4, paper:"Paper 1", year:"2023", examBoard:"AQA 8702",
    question:"Starting with this extract, explore how Shakespeare presents the theme of ambition in Macbeth.\n\nWrite a short paragraph (approx. 150 words) analysing one way ambition is presented. [Practice extract — 4 marks]",
    markScheme:"4 marks: Perceptive response with well-integrated textual references and analysis of Shakespeare's methods. 3 marks: Clear understanding with relevant references. 2 marks: Supported response with some references. 1 mark: Simple comments. Key points: 'vaulting ambition' soliloquy; Lady Macbeth's manipulation; tragic flaw; divine right of kings context." },
  { id:"lit2", subject:"English Literature", topic:"19th Century: A Christmas Carol", marks:5, paper:"Paper 1", year:"2022", examBoard:"AQA 8702",
    question:"How does Dickens use the character of Scrooge to present ideas about social responsibility?\n\nWrite a paragraph (approx. 100-150 words) focusing on one key moment. [5 marks]",
    markScheme:"5 marks: Perceptive, detailed with judicious references; analysis with subject terminology; thoughtful context. 4 marks: Clear with well-chosen references. 3 marks: Explained with references. 2 marks: Supported. 1 mark: Simple. Key: 'Are there no prisons?'; Victorian attitudes to poverty; transformation; Dickens' social campaigning; Christmas as catalyst for moral change." },
  { id:"lit3", subject:"English Literature", topic:"Modern Text: An Inspector Calls", marks:5, paper:"Paper 2", year:"2023", examBoard:"AQA 8702",
    question:"How does Priestley present the different ways older and younger characters respond to the Inspector?\n\nWrite a paragraph (approx. 150 words) focusing on one example. [5 marks]",
    markScheme:"5 marks: Perceptive, detailed with judicious references; analysis of Priestley's methods; thoughtful consideration of context. 4 marks: Clear with well-chosen references. 3 marks: Explained. 2 marks: Supported. 1 mark: Simple. Key: Mr/Mrs Birling dismissive vs Sheila/Eric accepting guilt; generational divide; socialist message; 1945 audience looking back at 1912; Inspector as mouthpiece for Priestley." },
  { id:"lit4", subject:"English Literature", topic:"Shakespeare: Romeo & Juliet", marks:4, paper:"Paper 1", year:"2024", examBoard:"AQA 8702",
    question:"How does Shakespeare present conflict in Romeo and Juliet?\n\nWrite a paragraph (approx. 150 words) analysing one example of conflict. [4 marks]",
    markScheme:"4 marks: Perceptive with well-integrated textual references and analysis. 3 marks: Clear with relevant references. 2 marks: Supported. 1 mark: Simple. Key areas: family feud (Montagues vs Capulets); internal conflict (Romeo's love vs loyalty); Tybalt's aggression; dramatic irony; Elizabethan honour culture context." },
  { id:"lit5", subject:"English Literature", topic:"Poetry: Power & Conflict", marks:4, paper:"Paper 2", year:"2022", examBoard:"AQA 8702",
    question:"Compare how poets present the effects of conflict in 'Exposure' by Wilfred Owen and one other poem from the Power and Conflict anthology.\n\nWrite a comparative paragraph (approx. 150 words). [4 marks practice]",
    markScheme:"4 marks: Perceptive comparison with well-integrated textual references, analysis of poets' methods, thoughtful context. 3 marks: Clear comparison with relevant references. 2 marks: Some comparison with some references. 1 mark: Simple comment. Key for Exposure: 'merciless iced east winds' personification; repeated 'But nothing happens'; futility of war; suffering from nature not enemy." },
  { id:"lit6", subject:"English Literature", topic:"19th Century: Jekyll & Hyde", marks:5, paper:"Paper 1", year:"2024", examBoard:"AQA 8702",
    question:"How does Stevenson present the theme of duality in 'The Strange Case of Dr Jekyll and Mr Hyde'?\n\nWrite a paragraph (approx. 150 words) focusing on one key aspect. [5 marks]",
    markScheme:"5 marks: Perceptive, detailed, judicious references, analysis with terminology, context. 4 marks: Clear, well-chosen references. 3 marks: Explained. 2 marks: Supported. 1 mark: Simple. Key: Physical contrast (Hyde smaller/deformed); Victorian respectability vs hidden desires; 'man is not truly one, but truly two'; Gothic genre; Darwin/evolution context; repression of the id." },
  // ══════════ MATHEMATICS ══════════
  { id:"ma1", subject:"Mathematics", topic:"Number: Standard Form", marks:2, paper:"Paper 1 (Non-calc)", year:"Summer 2024", examBoard:"Edexcel 1MA1",
    question:"Write 340 200 in standard form.",
    markScheme:"Answer: 3.402 × 10⁵. B1 for 3.402 × 10^n (wrong n), or a × 10⁵ (a not in standard form). B2 for 3.402 × 10⁵." },
  { id:"ma2", subject:"Mathematics", topic:"Probability: Tree Diagrams", marks:3, paper:"Paper 3 (Calculator)", year:"Summer 2024", examBoard:"Edexcel 1MA1",
    question:"A football team plays two games. The probability they win each game is 0.7.\n\n(a) Complete the tree diagram probabilities for Win and Not Win in both games.\n(b) Work out the probability that the team wins both games.",
    markScheme:"(a) Game 1: Win=0.7, Not Win=0.3; Game 2 from each: Win=0.7, Not Win=0.3. B2 all correct, B1 for 0.7 on Game 1. (b) P(both)=0.7×0.7=0.49. M1 correct method. A1 for 0.49." },
  { id:"ma3", subject:"Mathematics", topic:"Algebra: Solving Equations", marks:3, paper:"Paper 1 (Non-calc)", year:"Summer 2023", examBoard:"Edexcel 1MA1",
    question:"Solve 5(2x + 1) = 3(x - 4)\n\nShow your working clearly.",
    markScheme:"Expand: 10x+5=3x-12. M1 correct expansion. Collect: 7x=-17. M1. x=-17/7 or -2⁳⁄₇. A1." },
  { id:"ma4", subject:"Mathematics", topic:"Ratio & Proportion", marks:3, paper:"Paper 2 (Calculator)", year:"Summer 2023", examBoard:"Edexcel 1MA1",
    question:"Amy, Beth and Chloe share £240 in the ratio 3 : 5 : 4.\n\nWork out how much each person gets.",
    markScheme:"Total parts=12. One part=£20. Amy=£60, Beth=£100, Chloe=£80. M1 for 12. M1 for one amount or £20. A1 all three correct." },
  { id:"ma5", subject:"Mathematics", topic:"Geometry: Pythagoras", marks:3, paper:"Paper 2 (Calculator)", year:"Summer 2022", examBoard:"Edexcel 1MA1",
    question:"A right-angled triangle has a hypotenuse of 13 cm and one shorter side of 5 cm.\n\nCalculate the length of the other shorter side.",
    markScheme:"5²+b²=13². 25+b²=169. b²=144. b=12 cm. M1 substitution. M1 rearrangement. A1 for 12." },
  { id:"ma6", subject:"Mathematics", topic:"Percentages", marks:2, paper:"Paper 2 (Calculator)", year:"Summer 2024", examBoard:"Edexcel 1MA1",
    question:"A laptop costs £550. In a sale, the price is reduced by 15%.\n\nCalculate the sale price of the laptop.",
    markScheme:"15% of 550 = 82.50. Sale price = 550-82.50 = £467.50. OR 0.85×550=467.50. M1 for finding 15% or multiplying by 0.85. A1 for £467.50." },
  { id:"ma7", subject:"Mathematics", topic:"Algebra: Sequences", marks:3, paper:"Paper 1 (Non-calc)", year:"Summer 2022", examBoard:"Edexcel 1MA1",
    question:"The nth term of a sequence is 3n + 7.\n\n(a) Find the first three terms of the sequence.\n(b) Is 50 a term in this sequence? Explain your answer.",
    markScheme:"(a) n=1: 10, n=2: 13, n=3: 16. B1 for all three correct. (b) 3n+7=50, 3n=43, n=43/3=14.33... This is not a whole number so 50 is not a term. M1 for setting up equation. A1 for correct conclusion with reasoning." },
  { id:"ma8", subject:"Mathematics", topic:"Statistics: Averages", marks:3, paper:"Paper 3 (Calculator)", year:"Summer 2023", examBoard:"Edexcel 1MA1",
    question:"The ages of 7 people in a group are: 12, 15, 14, 18, 12, 16, 15.\n\nFind the mean, median and mode.",
    markScheme:"Mean: (12+15+14+18+12+16+15)÷7 = 102÷7 = 14.57 (2dp). Ordered: 12,12,14,15,15,16,18. Median=15 (middle value). Mode=12 and 15 (both appear twice — bimodal). B1 for mean. B1 for median. B1 for mode." },
  { id:"ma9", subject:"Mathematics", topic:"Geometry: Area & Volume", marks:4, paper:"Paper 2 (Calculator)", year:"Summer 2024", examBoard:"Edexcel 1MA1",
    question:"A cylinder has radius 5 cm and height 12 cm.\n\nCalculate the volume of the cylinder. Give your answer to 3 significant figures.\n\n[Volume of cylinder = πr²h]",
    markScheme:"V=π×5²×12 = π×25×12 = 300π = 942.477... ≈ 942 cm³. M1 for π×5². M1 for ×12. A1 for 300π or 942.47... A1 for 942 (3sf)." },
  { id:"ma10", subject:"Mathematics", topic:"Number: Fractions", marks:3, paper:"Paper 1 (Non-calc)", year:"Summer 2022", examBoard:"Edexcel 1MA1",
    question:"Work out  2¾ ÷ ½\n\nGive your answer as a mixed number.",
    markScheme:"2¾ = 11/4. 11/4 ÷ 1/2 = 11/4 × 2/1 = 22/4 = 11/2 = 5½. M1 convert to improper. M1 multiply by reciprocal. A1 for 5½." },
  // ══════════ COMBINED SCIENCE ══════════
  { id:"sc1", subject:"Combined Science", topic:"Biology: Cell Biology", marks:3, paper:"Biology Paper 1", year:"2023", examBoard:"AQA 8464",
    question:"Describe three differences between a plant cell and an animal cell.",
    markScheme:"1 mark each up to 3: (1) Plant cells have cell wall, animal do not; (2) Plant cells have chloroplasts, animal do not; (3) Plant cells have permanent large vacuole, animal have small/temporary ones; (4) Plant cells have fixed shape, animal irregular." },
  { id:"sc2", subject:"Combined Science", topic:"Chemistry: Bonding", marks:4, paper:"Chemistry Paper 1", year:"2023", examBoard:"AQA 8464",
    question:"Explain why sodium chloride has a high melting point.",
    markScheme:"1 mark each up to 4: (1) Ionic bond/contains ions; (2) Strong electrostatic forces of attraction; (3) Between oppositely charged ions; (4) Lot of energy needed to overcome these forces. Accept giant ionic lattice. Do not accept 'strong bonds between atoms'." },
  { id:"sc3", subject:"Combined Science", topic:"Physics: Energy", marks:3, paper:"Physics Paper 1", year:"2022", examBoard:"AQA 8464",
    question:"A kettle has a power rating of 2000 W. It takes 180 seconds to boil the water.\n\nCalculate the energy transferred. Give your answer in kJ.\n\nEnergy = Power × Time",
    markScheme:"E=2000×180=360000 J. Convert: 360000÷1000=360 kJ. M1 substitution. A1 for 360000. A1 for 360 kJ." },
  { id:"sc4", subject:"Combined Science", topic:"Biology: Infection & Response", marks:4, paper:"Biology Paper 1", year:"2024", examBoard:"AQA 8464",
    question:"Explain how vaccination prevents a person from getting a disease.",
    markScheme:"1 mark per point up to 4: (1) Vaccine contains dead/inactive/weakened pathogens or antigens; (2) White blood cells/lymphocytes produce antibodies; (3) Memory cells produced; (4) If same pathogen re-enters, antibodies produced faster/in greater quantities; (5) Pathogen destroyed before causing disease." },
  { id:"sc5", subject:"Combined Science", topic:"Chemistry: Quantitative", marks:2, paper:"Chemistry Paper 1", year:"2023", examBoard:"AQA 8464",
    question:"Calculate the relative formula mass (Mr) of calcium carbonate (CaCO₃).\n\n[Ca=40, C=12, O=16]",
    markScheme:"Mr=40+12+(3×16)=40+12+48=100. M1 for correct method (3×16=48 seen). A1 for 100." },
  { id:"sc6", subject:"Combined Science", topic:"Physics: Electricity", marks:3, paper:"Physics Paper 1", year:"2024", examBoard:"AQA 8464",
    question:"A resistor has a potential difference of 12 V across it and a current of 0.5 A flowing through it.\n\nCalculate the resistance.\n\nV = I × R",
    markScheme:"R=V/I=12/0.5=24 Ω. M1 for rearranging V=IR to R=V/I. M1 for correct substitution. A1 for 24 Ω." },
  { id:"sc7", subject:"Combined Science", topic:"Biology: Organisation", marks:4, paper:"Biology Paper 1", year:"2022", examBoard:"AQA 8464",
    question:"Describe the role of enzymes in digestion. Include a named example in your answer.",
    markScheme:"1 mark per point up to 4: (1) Enzymes are biological catalysts; (2) They speed up digestion/break down large molecules into smaller ones; (3) Named example: amylase breaks down starch into sugars (maltose); OR protease breaks down proteins into amino acids; OR lipase breaks down fats into fatty acids and glycerol; (4) They have a specific active site / lock and key model; (5) They work at an optimum temperature/pH." },
  { id:"sc8", subject:"Combined Science", topic:"Chemistry: Atomic Structure", marks:3, paper:"Chemistry Paper 1", year:"2024", examBoard:"AQA 8464",
    question:"An atom of sodium has the atomic number 11 and mass number 23.\n\nState the number of protons, neutrons and electrons in a sodium atom.",
    markScheme:"Protons = 11 (equals atomic number). Neutrons = 23-11 = 12 (mass number minus atomic number). Electrons = 11 (same as protons in an atom). B1 for protons. B1 for neutrons. B1 for electrons." },
  { id:"sc9", subject:"Combined Science", topic:"Physics: Forces", marks:4, paper:"Physics Paper 2", year:"2023", examBoard:"AQA 8464",
    question:"A car of mass 1200 kg accelerates from rest to 20 m/s in 8 seconds.\n\n(a) Calculate the acceleration.\n(b) Calculate the resultant force acting on the car.\n\n[a = Δv/t ; F = ma]",
    markScheme:"(a) a = (20-0)/8 = 2.5 m/s². M1 for substitution. A1 for 2.5. (b) F = 1200 × 2.5 = 3000 N. M1 for substitution. A1 for 3000 N." },
  { id:"sc10", subject:"Combined Science", topic:"Biology: Ecology", marks:3, paper:"Biology Paper 2", year:"2022", examBoard:"AQA 8464",
    question:"Describe how carbon is recycled in the carbon cycle.",
    markScheme:"1 mark per point up to 3: (1) CO₂ absorbed by plants during photosynthesis; (2) Carbon passed along food chains when organisms eat other organisms; (3) Carbon released back as CO₂ through respiration; (4) Decomposers break down dead organisms releasing CO₂; (5) Combustion of fossil fuels releases CO₂." },
  { id:"sc11", subject:"Combined Science", topic:"Chemistry: Chemical Changes", marks:3, paper:"Chemistry Paper 1", year:"2023", examBoard:"AQA 8464",
    question:"Describe what happens when zinc is added to copper sulfate solution. Explain your answer in terms of reactivity.",
    markScheme:"1 mark per point up to 3: (1) Zinc is more reactive than copper; (2) Zinc displaces copper from the solution / a displacement reaction occurs; (3) The solution changes from blue to colourless; (4) A brown/orange coating of copper forms on the zinc; (5) Zinc sulfate is formed in solution." },
  { id:"sc12", subject:"Combined Science", topic:"Physics: Waves", marks:3, paper:"Physics Paper 2", year:"2024", examBoard:"AQA 8464",
    question:"A sound wave has a frequency of 500 Hz and a wavelength of 0.68 m.\n\nCalculate the speed of the sound wave.\n\nv = f × λ",
    markScheme:"v = 500 × 0.68 = 340 m/s. M1 for correct substitution. A1 for 340. A1 for correct unit m/s." },
  // ══════════ BUSINESS ══════════
  { id:"bu1", subject:"Business", topic:"1.1 Enterprise & Entrepreneurship", marks:3, paper:"Paper 1", year:"Summer 2023", examBoard:"Edexcel 1BS0",
    question:"Explain one way a business could add value to its products.",
    markScheme:"1 mark identification + 2 marks linked explanation. E.g.: Branding (1). Customers perceive higher quality (1). Business charges higher price, increasing revenue (1). Other ways: convenience, quality, design, USPs. Max 1 if multiple ways listed with no explanation. AO1a=1, AO1b=2." },
  { id:"bu2", subject:"Business", topic:"1.5 External Influences", marks:6, paper:"Paper 1", year:"Summer 2024", examBoard:"Edexcel 1BS0",
    question:"Analyse the impact of a rise in interest rates on a small business that has a bank loan.",
    markScheme:"L3(5-6): Accurate knowledge, appropriate terminology, detailed interconnected points, logical chains. L2(3-4): Mostly accurate, interconnected points with some inconsistencies. L1(1-2): Elements of knowledge, limited connections. Content: Higher rates→higher repayments→increased costs→less cash for investment→cash flow problems→may increase prices→reduced competitiveness; consumer spending falls→reduced demand." },
  { id:"bu3", subject:"Business", topic:"1.3 Business Finance", marks:2, paper:"Paper 1", year:"Summer 2022", examBoard:"Edexcel 1BS0",
    question:"A business has total revenue of £45,000 and total costs of £32,000.\n\nCalculate the profit.",
    markScheme:"Profit = Revenue - Costs = £45,000-£32,000 = £13,000. M1 correct method. A1 for £13,000." },
  { id:"bu4", subject:"Business", topic:"1.2 Spotting Opportunities", marks:3, paper:"Paper 1", year:"November 2021", examBoard:"Edexcel 1BS0",
    question:"Explain one reason why an entrepreneur who is adapting an existing product might have an advantage over one creating an original idea.",
    markScheme:"1 mark identification + 2 marks linked explanation. E.g.: Already understands the market (1). Market research already carried out (1). Better understanding of customer needs (1). OR Reduced development costs (1). Less need for new finance (1). Quicker to launch (1). Max 1 for listing. AO1a=1, AO1b=2." },
  { id:"bu5", subject:"Business", topic:"2.2 Marketing Decisions", marks:2, paper:"Paper 2", year:"Summer 2023", examBoard:"Edexcel 1BS0",
    question:"State one element of the marketing mix and give an example of how a plumbing business could use it.",
    markScheme:"1 mark for element, 1 mark for application. E.g.: Place — distributing services to customer homes in local area (1+1). OR Promotion — methods to attract customers such as local Facebook ads (1+1). OR Product — repair/install boilers (1+1). Must show application for 2nd mark. AO2." },
  { id:"bu6", subject:"Business", topic:"1.5 Stakeholders", marks:2, paper:"Paper 1", year:"Summer 2023", examBoard:"Edexcel 1BS0",
    question:"Outline one reason why the government would want a small business to be successful.",
    markScheme:"Up to 2 marks for linked points. E.g.: Government collects more tax (1). Taxes based on the profits the business makes (1). OR Government wants more employment (1). Business may employ more people if successful (1). Must be linked for 2 marks. AO2." },
  { id:"bu7", subject:"Business", topic:"2.5 Human Resources", marks:6, paper:"Paper 2", year:"Summer 2024", examBoard:"Edexcel 1BS0",
    question:"Analyse the impact of improving environmental responsibility on a business.",
    markScheme:"L3(5-6): Accurate knowledge, detailed logical chains. L2(3-4): Mostly accurate, some chains. L1(1-2): Limited knowledge. Content: May reduce pressure group activity (AO1b); May add value so charge higher price (AO1b); Avoid negative media coverage → enhance brand (AO3a); Net profit margins may rise if extra price exceeds additional costs (AO3a)." },
  { id:"bu8", subject:"Business", topic:"1.4 Marketing Mix", marks:3, paper:"Paper 1", year:"November 2021", examBoard:"Edexcel 1BS0",
    question:"Explain one way that the use of technology could affect the location choice for a new business.",
    markScheme:"1 mark identification + 2 marks explanation. E.g.: Choose a cheaper location (1). Because business can use e-commerce instead (1). May not require a physical retail location (1). OR Need good internet connections (1). Business needs internet to communicate with stakeholders (1). Weak signal could cause communication barriers (1). AO1a=1, AO1b=2." },
  // ══════════ FOOD & NUTRITION ══════════
  { id:"fn1", subject:"Food & Nutrition", topic:"Nutrition: Macronutrients", marks:4, paper:"Paper 1 (J309/01)", year:"2023", examBoard:"OCR J309",
    question:"Explain the functions of protein in the diet.",
    markScheme:"1 mark each up to 4: (1) Growth of cells/tissues/muscles; (2) Repair of cells/tissues; (3) Maintenance of cells; (4) Secondary energy source (4 kcal/g); (5) Makes enzymes/hormones/antibodies; (6) Essential for children's development. Not 'keeps you healthy'." },
  { id:"fn2", subject:"Food & Nutrition", topic:"Food Safety", marks:3, paper:"Paper 1 (J309/01)", year:"2022", examBoard:"OCR J309",
    question:"Explain why food should not be left in the 'danger zone' temperature range.",
    markScheme:"1 mark per point up to 3: (1) Danger zone is 5°C-63°C; (2) Bacteria multiply rapidly; (3) Bacteria double every 10-20 minutes in ideal conditions; (4) Can cause food poisoning; (5) Food should be kept below 5°C or above 63°C." },
  { id:"fn3", subject:"Food & Nutrition", topic:"Cooking & Food Prep", marks:4, paper:"Paper 1 (J309/01)", year:"2024", examBoard:"OCR J309",
    question:"Explain what happens to protein when food is cooked. Use correct technical terminology.",
    markScheme:"1 mark per point up to 4: (1) Protein denatures when heated; (2) Bonds break/unfold; (3) Protein changes shape; (4) Coagulation occurs — protein sets/becomes solid; (5) Process is irreversible; (6) Example: egg white turning opaque. Key terms: denaturation, coagulation." },
  { id:"fn4", subject:"Food & Nutrition", topic:"Nutrition: Vitamins", marks:3, paper:"Paper 1 (J309/01)", year:"2023", examBoard:"OCR J309",
    question:"Explain three reasons why vitamin C is important in the diet. Give a food source for each.",
    markScheme:"1 mark for function + source pair, up to 3 marks: (1) Helps absorb iron / prevents scurvy — citrus fruits/oranges; (2) Protects cells and keeps them healthy / antioxidant — peppers/strawberries; (3) Helps with wound healing — broccoli/potatoes; (4) Maintains healthy connective tissue — blackcurrants/kiwi. Must name both function and source for each mark." },
  { id:"fn5", subject:"Food & Nutrition", topic:"Food Provenance", marks:3, paper:"Paper 1 (J309/01)", year:"2022", examBoard:"OCR J309",
    question:"Explain what is meant by 'food miles' and why they are a concern for the environment.",
    markScheme:"1 mark per point up to 3: (1) Food miles = the distance food travels from where it is produced to where it is consumed; (2) Transporting food produces carbon dioxide/greenhouse gases; (3) This contributes to climate change/global warming; (4) Air freight has the highest carbon footprint; (5) Buying local/seasonal food reduces food miles." },
  // ══════════ MUSIC ══════════
  { id:"mu1", subject:"Music", topic:"Musical Elements", marks:4, paper:"Component 3", year:"2023", examBoard:"Edexcel 1MU0",
    question:"Describe four musical elements that could be used to create a sense of tension in a piece of music.",
    markScheme:"1 mark per element described, up to 4: (1) Dynamics — crescendo/sforzando; (2) Tempo — accelerando; (3) Harmony — dissonant chords/chromatic/minor key; (4) Texture — thickening/layering; (5) Rhythm — ostinato/syncopation; (6) Pitch — rising line/high register; (7) Timbre — harsh timbres. Must name element AND explain how it creates tension." },
  { id:"mu2", subject:"Music", topic:"Music Theory", marks:3, paper:"Component 3", year:"2022", examBoard:"Edexcel 1MU0",
    question:"Explain the difference between a major key and a minor key. How does each typically affect the mood?",
    markScheme:"Up to 3 marks: (1) Major has major third interval/major scale pattern; (2) Minor has minor third/minor scale pattern; (3) Major sounds happy/bright; (4) Minor sounds sad/dark/melancholy; (5) Reference to intervals or examples. Max 2 if no mood reference." },
  { id:"mu3", subject:"Music", topic:"Musical Devices", marks:3, paper:"Component 3", year:"2024", examBoard:"Edexcel 1MU0",
    question:"Define the following musical terms: (a) ostinato, (b) crescendo, (c) syncopation.",
    markScheme:"(a) Ostinato: a repeated musical pattern/phrase/rhythm (1). (b) Crescendo: gradually getting louder (1). (c) Syncopation: emphasis on normally weak/off beats (1). B1 for each correct definition." },
  { id:"mu4", subject:"Music", topic:"Instrumentation", marks:4, paper:"Component 3", year:"2023", examBoard:"Edexcel 1MU0",
    question:"Describe how the timbre and texture of a pop/rock song might change between the verse and the chorus.",
    markScheme:"1 mark per valid point up to 4: (1) Verse may have thinner texture / fewer instruments; (2) Chorus typically thicker texture / more instruments added; (3) Drums may be louder/heavier in chorus; (4) Electric guitar may switch from clean to distorted; (5) Backing vocals added in chorus; (6) Bass may be more prominent in chorus; (7) Dynamic contrast — verse quieter, chorus louder." },
  // ══════════ RELIGIOUS STUDIES ══════════
  { id:"rs1", subject:"Religious Studies", topic:"Theme C: Existence of God", marks:5, paper:"Component 2", year:"2023", examBoard:"AQA 8062",
    question:"Explain two reasons why some people believe in the Design argument for the existence of God.\n\nRefer to religious teaching in your answer.",
    markScheme:"Up to 5 marks. Simple explanation=1 mark each. Detailed=2 each. +1 for religious teaching. Possible: (1) World appears designed with purpose/complexity; (2) Paley's watch analogy; (3) Beauty and order suggests designer; (4) 'In the beginning God created' (Genesis 1:1); (5) Anthropic principle — fine-tuned for life; (6) Tennant's aesthetic argument." },
  { id:"rs2", subject:"Religious Studies", topic:"Theme D: Peace & Conflict", marks:12, paper:"Component 2", year:"2024", examBoard:"AQA 8062",
    question:"'There is never a good reason to go to war.'\n\nEvaluate this statement. Refer to religious teaching, give reasoned arguments for and against, and reach a justified conclusion.\n\n[12 marks + 3 SPaG]",
    markScheme:"L4(10-12): Well-argued, justified conclusion, awareness of breadth, different viewpoints including religious. L3(7-9): Mostly well-argued with some justified conclusions. L2(4-6): Reasoned consideration but lacking structure. L1(1-3): Simple points. FOR: Jesus 'love your enemies'; pacifism (Quakers); sanctity of life; innocent suffering. AGAINST: Just War theory (Aquinas) — just cause, legitimate authority, right intention, last resort, proportional; self-defence; protecting innocents. SPaG: 3=consistent, 2=reasonable, 1=some." },
  { id:"rs3", subject:"Religious Studies", topic:"Christianity: Beliefs", marks:4, paper:"Component 1", year:"2023", examBoard:"AQA 8062",
    question:"Explain two Christian beliefs about the nature of God.\n\nRefer to scripture or sacred writing in your answer.",
    markScheme:"Up to 4 marks. Simple=1 each. Detailed=2 each. +scripture. Possible: (1) Omnipotent — Genesis creation; (2) Omnibenevolent — 'God is love' (1 John 4:8); (3) Omniscient; (4) Trinity — Father, Son, Holy Spirit; (5) Just — fair judge; (6) Transcendent yet immanent." },
  { id:"rs4", subject:"Religious Studies", topic:"Theme A: Relationships", marks:5, paper:"Component 2", year:"2022", examBoard:"AQA 8062",
    question:"Explain two contrasting religious beliefs about the purpose of marriage.\n\nRefer to scripture or sacred writings in your answer.",
    markScheme:"Up to 5 marks. Simple explanation=1 each. Detailed=2 each. +1 scripture. Christian views: (1) Lifelong commitment / 'What God has joined together let no one separate' (Mark 10:9); (2) Procreation and raising children; (3) Companionship — 'It is not good for man to be alone' (Genesis 2:18). Other views: (4) Different faiths may emphasise family/community duty; (5) Some see it as a legal contract rather than sacrament." },
  { id:"rs5", subject:"Religious Studies", topic:"Theme B: Religion & Life", marks:4, paper:"Component 2", year:"2024", examBoard:"AQA 8062",
    question:"Explain two religious beliefs about the sanctity of life.\n\nRefer to sacred writings in your answer.",
    markScheme:"Up to 4 marks. Simple=1 each. Detailed=2 each. Possible: (1) Life is sacred/holy because created by God; (2) 'God created mankind in his own image' (Genesis 1:27) — imago dei; (3) 'Before I formed you in the womb I knew you' (Jeremiah 1:5); (4) All life has value regardless of quality; (5) Only God has the right to take life; (6) The body is a 'temple of the Holy Spirit' (1 Corinthians 6:19)." },
  { id:"rs6", subject:"Religious Studies", topic:"Theme E: Crime & Punishment", marks:5, paper:"Component 2", year:"2023", examBoard:"AQA 8062",
    question:"Explain two religious beliefs about forgiveness.\n\nRefer to scripture or sacred writings in your answer.",
    markScheme:"Up to 5 marks. Simple=1 each. Detailed=2 each. +1 scripture. Possible: (1) Christians believe forgiveness is essential — Jesus forgave those who crucified him ('Father, forgive them' Luke 23:34); (2) The Lord's Prayer: 'forgive us our sins as we forgive those who sin against us'; (3) Peter asked how many times to forgive — Jesus said '70 times 7' (Matthew 18:22) meaning unlimited; (4) Restorative justice reflects forgiveness; (5) Islam: Allah is 'the Most Merciful'." }
];

const SUBJECTS = [...new Set(QUESTIONS.map(q => q.subject))];
const SUBJECT_COLORS = {
  "English Language":{ bg:"#FF6B6B", light:"#FFE0E0", dark:"#C0392B" },
  "English Literature":{ bg:"#E056A0", light:"#FCE4F0", dark:"#8E2462" },
  "Mathematics":{ bg:"#4ECDC4", light:"#D4F5F2", dark:"#16A085" },
  "Combined Science":{ bg:"#45B7D1", light:"#D6EFF7", dark:"#2980B9" },
  "Business":{ bg:"#F7B731", light:"#FFF3D4", dark:"#D4941A" },
  "Food & Nutrition":{ bg:"#26DE81", light:"#D5F9E5", dark:"#1B9E5C" },
  "Music":{ bg:"#A55EEA", light:"#EDE0FA", dark:"#7C3AED" },
  "Religious Studies":{ bg:"#FC5C65", light:"#FFE0E2", dark:"#C0392B" },
};
const SUBJECT_ICONS = {
  "English Language":"✍️","English Literature":"📖","Mathematics":"📐",
  "Combined Science":"🔬","Business":"💼","Food & Nutrition":"🍳",
  "Music":"🎵","Religious Studies":"☮️",
};

async function markAnswer(question, answer) {
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers:{"Content-Type":"application/json",
    "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
    "anthropic-version": "2023-06-01",
    "anthropic-dangerous-direct-browser-access": "true"},
      body: JSON.stringify({
        model:"claude-sonnet-4-20250514", max_tokens:1000,
        messages:[{role:"user",content:`You are a GCSE examiner for ${question.examBoard}. Mark strictly per the mark scheme.

SUBJECT: ${question.subject} | TOPIC: ${question.topic} | PAPER: ${question.paper} (${question.year})
QUESTION (${question.marks} marks): ${question.question}
MARK SCHEME: ${question.markScheme}
STUDENT ANSWER: ${answer}

Respond ONLY with this JSON:
{"score":__,"maxMarks":${question.marks},"percentage":__,"feedback":"2-3 sentences on what was done well","improvements":"2-3 specific actionable tips","gradeIndicator":"Excellent|Good|Satisfactory|Needs Improvement"}`}]
      })
    });
    const data = await r.json();
    const text = data.content.map(i=>i.text||"").join("\n");
    return JSON.parse(text.replace(/```json|```/g,"").trim());
  } catch(e){ console.error(e); return null; }
}

async function load(key, fb) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fb;
  } catch { return fb; }
}

async function save(key, d) {
  try { localStorage.setItem(key, JSON.stringify(d)); } catch {}
}
export default function App() {
  const [screen,setScreen]=useState("home");
  const [selSubj,setSelSubj]=useState(null);
  const [curQ,setCurQ]=useState(null);
  const [ans,setAns]=useState("");
  const [marking,setMarking]=useState(false);
  const [result,setResult]=useState(null);
  const [history,setHistory]=useState([]);
  const [sessions,setSessions]=useState([]);
  const [sessStart,setSessStart]=useState(null);
  const [loaded,setLoaded]=useState(false);
  const taRef=useRef(null);

  useEffect(()=>{(async()=>{ setHistory(await load("bh",[])); setSessions(await load("bs",[])); setLoaded(true); })();},[]);
  useEffect(()=>{ if(loaded) save("bh",history); },[history,loaded]);
  useEffect(()=>{ if(loaded) save("bs",sessions); },[sessions,loaded]);

  const startQ=q=>{ setCurQ(q); setAns(""); setResult(null); setScreen("question"); if(!sessStart) setSessStart(Date.now()); };

  const submit=async()=>{
    if(!ans.trim()) return;
    setMarking(true);
    const res=await markAnswer(curQ,ans);
    if(res){
      setResult(res);
      setHistory(p=>[...p,{ id:Date.now(), qId:curQ.id, subject:curQ.subject, topic:curQ.topic,
        marks:curQ.marks, score:res.score, pct:res.percentage, date:new Date().toISOString(), grade:res.gradeIndicator }]);
    }
    setMarking(false);
  };

  const subjStats=s=>{ const e=history.filter(h=>h.subject===s); if(!e.length) return null; return {count:e.length, avg:Math.round(e.reduce((a,x)=>a+x.pct,0)/e.length)}; };
  const topicStats=s=>{ const e=history.filter(h=>h.subject===s); const t={}; e.forEach(x=>{if(!t[x.topic])t[x.topic]=[]; t[x.topic].push(x.pct);}); return Object.entries(t).map(([k,v])=>({topic:k,count:v.length,avg:Math.round(v.reduce((a,b)=>a+b,0)/v.length)})); };
  const totalMin=sessions.reduce((a,s)=>a+s.m,0);
  const totalQ=history.length;
  const oAvg=totalQ?Math.round(history.reduce((a,h)=>a+h.pct,0)/totalQ):0;
  const streak=(()=>{ const ds=[...new Set(history.map(h=>h.date.slice(0,10)))].sort().reverse(); let c=0; const td=new Date().toISOString().slice(0,10); const yd=new Date(Date.now()-864e5).toISOString().slice(0,10); if(ds[0]!==td&&ds[0]!==yd)return 0; let ck=ds[0]===td?new Date():new Date(Date.now()-864e5); for(const d of ds){if(d===ck.toISOString().slice(0,10)){c++;ck=new Date(ck-864e5);}else break;} return c; })();
const resetAll = async () => {
  setHistory([]);
  setSessions([]);
  localStorage.removeItem("bh");
  localStorage.removeItem("bs");
};
  const questionsForSubj=s=>QUESTIONS.filter(q=>q.subject===s);

  const props={screen,setScreen,selSubj,setSelSubj,curQ,setCurQ,ans,setAns,marking,result,submit,startQ,
    history,subjStats,topicStats,totalMin,totalQ,oAvg,streak,resetAll,questionsForSubj,taRef,QUESTIONS};

  return (
    <div style={S.ctr}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;0,9..40,800&family=Space+Mono:wght@400;700&display=swap');
      *{box-sizing:border-box;-webkit-font-smoothing:antialiased}
      @keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      button:hover{transform:translateY(-1px)} button:active{transform:scale(.98)} textarea:focus{border-color:#4ECDC4!important;box-shadow:0 0 0 3px rgba(78,205,196,.15)}
      ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#ddd;border-radius:4px}`}</style>
      <div style={S.glow}/>
      <div style={S.content}>
        {screen==="home"&&<Home {...props}/>}
        {screen==="subjects"&&<Subj {...props}/>}
        {screen==="question"&&<Quest {...props}/>}
        {screen==="stats"&&<Stats {...props}/>}
      </div>
    </div>
  );
}

function Home({startQ,setScreen,setSelSubj,subjStats,totalMin,totalQ,oAvg,streak,QUESTIONS}){
  const rQ=QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)];
  const hr=new Date().getHours();
  return <>
    <div style={{marginBottom:28}}>
      <p style={S.greet}>Good {hr<12?"morning":hr<17?"afternoon":"evening"} ✨</p>
      <h1 style={S.hero}>Becca's Revision Hub</h1>
      <p style={S.sub}>Smash those GCSEs — one question at a time</p>
    </div>
    <div style={S.sRow}>
      <Stat icon="🔥" val={streak} label="Streak" c="#FF6B6B"/>
      <Stat icon="✅" val={totalQ} label="Done" c="#4ECDC4"/>
      <Stat icon="📊" val={`${oAvg}%`} label="Avg" c="#F7B731"/>
      <Stat icon="⏱️" val={`${totalMin}m`} label="Time" c="#A55EEA"/>
    </div>
    <button style={S.bigBtn} onClick={()=>startQ(rQ)}>
      <span style={{fontSize:28}}>⚡</span>
      <div><div style={{fontWeight:700,fontSize:18,fontFamily:"'DM Sans',sans-serif"}}>Quick Practice</div>
      <div style={{fontSize:13,opacity:.85,marginTop:2}}>Random question · {QUESTIONS.length} available across all subjects</div></div>
    </button>
    <h2 style={S.sec}>Your Subjects</h2>
    <div style={S.grid}>
      {SUBJECTS.map(s=>{const st=subjStats(s);const c=SUBJECT_COLORS[s];const qc=QUESTIONS.filter(q=>q.subject===s).length;
        return <button key={s} style={{...S.card,background:`linear-gradient(135deg,${c.bg}15,${c.bg}08)`,borderColor:`${c.bg}30`}}
          onClick={()=>{setSelSubj(s);setScreen("subjects")}}>
          <div style={{fontSize:28,marginBottom:4}}>{SUBJECT_ICONS[s]}</div>
          <div style={{fontWeight:700,fontSize:13,color:"#1a1a2e",fontFamily:"'DM Sans',sans-serif"}}>{s}</div>
          <div style={{fontSize:11,color:"#888",marginTop:2}}>{qc} questions</div>
          {st&&<div style={{display:"flex",gap:6,marginTop:6,fontSize:11,justifyContent:"center"}}>
            <span style={{...S.tag,background:c.light,color:c.dark}}>{st.count} done</span>
            <span style={{...S.tag,background:st.avg>=70?"#D5F9E5":st.avg>=40?"#FFF3D4":"#FFE0E0",color:st.avg>=70?"#1B9E5C":st.avg>=40?"#D4941A":"#C0392B"}}>{st.avg}%</span>
          </div>}
        </button>})}
    </div>
    <div style={{textAlign:"center",padding:"8px 0",fontSize:13,color:"#aaa",marginBottom:8}}>📝 {QUESTIONS.length} total questions available</div>
    <div style={S.navRow}>
      <NavBtn icon="📊" label="Stats" onClick={()=>setScreen("stats")}/>
      <NavBtn icon="📚" label="Subjects" onClick={()=>setScreen("subjects")}/>
    </div>
  </>;
}

function Subj({setScreen,setSelSubj,startQ,selSubj,subjStats,topicStats,questionsForSubj}){
  const s=selSubj; const qs=s?questionsForSubj(s):QUESTIONS; const c=SUBJECT_COLORS[s]||{bg:"#666",light:"#eee",dark:"#333"};
  const st=s?subjStats(s):null; const ts=s?topicStats(s):[];
  if(!s) return <>
    <button onClick={()=>setScreen("home")} style={S.back}>← Home</button>
    <h1 style={{...S.hero,fontSize:26}}>All Subjects</h1>
    {SUBJECTS.map(sub=>{const sc=SUBJECT_COLORS[sub];const qc=QUESTIONS.filter(q=>q.subject===sub).length;
      return <button key={sub} style={{...S.qCard,borderLeft:`4px solid ${sc.bg}`}} onClick={()=>{setSelSubj(sub)}}>
        <div style={{fontWeight:700,fontSize:15,color:"#1a1a2e"}}>{SUBJECT_ICONS[sub]} {sub}</div>
        <div style={{fontSize:12,color:"#888"}}>{qc} questions available</div>
      </button>})}
  </>;
  return <>
    <button onClick={()=>setScreen("home")} style={S.back}>← Home</button>
    <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
      <div style={{fontSize:40}}>{SUBJECT_ICONS[s]}</div>
      <div><h1 style={{...S.hero,fontSize:26,margin:0}}>{s}</h1>
        <p style={{margin:0,fontSize:13,color:"#888"}}>{qs.length} questions {st?`· ${st.count} completed · ${st.avg}% avg`:""}</p>
      </div>
    </div>
    {ts.length>0&&<div style={{marginBottom:20}}>
      <h3 style={{...S.sec,fontSize:15}}>Topic Performance</h3>
      {ts.map(t=><div key={t.topic} style={S.topicRow}>
        <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:"#1a1a2e"}}>{t.topic}</div><div style={{fontSize:10,color:"#888"}}>{t.count} attempts</div></div>
        <div style={{width:100}}><div style={{height:7,borderRadius:4,background:"#f0f0f0"}}><div style={{height:7,borderRadius:4,width:`${t.avg}%`,background:t.avg>=70?"#26DE81":t.avg>=40?"#F7B731":"#FF6B6B"}}/></div></div>
        <span style={{fontSize:12,fontWeight:700,color:c.dark,minWidth:32,textAlign:"right"}}>{t.avg}%</span>
      </div>)}
    </div>}
    <h3 style={{...S.sec,fontSize:15}}>Practice Questions</h3>
    {qs.map(q=><button key={q.id} style={S.qCard} onClick={()=>startQ(q)}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}>
            <span style={{...S.tag,background:c.light,color:c.dark}}>{q.topic}</span>
            <span style={{...S.tag,background:"#f5f5f5",color:"#666"}}>{q.paper} · {q.year}</span>
          </div>
          <div style={{fontSize:13,color:"#1a1a2e",lineHeight:1.5}}>{q.question.slice(0,120)}...</div>
        </div>
        <div style={{...S.badge,background:c.bg}}>{q.marks}</div>
      </div>
    </button>)}
  </>;
}

function Quest({curQ:q,ans,setAns,marking,result,submit,setScreen,startQ,taRef,QUESTIONS}){
  const c=SUBJECT_COLORS[q.subject]||{bg:"#666",light:"#eee",dark:"#333"};
  const next=QUESTIONS.filter(x=>x.subject===q.subject&&x.id!==q.id);
  const rn=next.length?next[Math.floor(Math.random()*next.length)]:QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)];
  useEffect(()=>{if(taRef.current&&!result) taRef.current.focus();},[q,result]);
  return <>
    <button onClick={()=>setScreen("subjects")} style={S.back}>← Back</button>
    <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
      <span style={{...S.tag,background:c.light,color:c.dark}}>{SUBJECT_ICONS[q.subject]} {q.subject}</span>
      <span style={{...S.tag,background:"#f0f0f0",color:"#555"}}>{q.topic}</span>
      <span style={{...S.tag,background:c.bg,color:"#fff"}}>{q.marks} marks</span>
    </div>
    <div style={{fontSize:11,color:"#888",marginBottom:12,fontFamily:"'Space Mono',monospace"}}>
      📄 {q.examBoard} · {q.paper} · {q.year}
    </div>
    <div style={S.qBox}><pre style={S.qText}>{q.question}</pre></div>
    {!result&&<>
      <textarea ref={taRef} value={ans} onChange={e=>setAns(e.target.value)} placeholder="Write your answer here..." style={S.ta} rows={8}/>
      <button onClick={submit} disabled={marking||!ans.trim()} style={{...S.bigBtn,opacity:marking||!ans.trim()?.6:1,background:marking?"#888":undefined}}>
        {marking?<div style={{display:"flex",alignItems:"center",gap:10}}><div style={S.spin}/><span style={{fontWeight:600}}>Marking your answer...</span></div>
        :<><span style={{fontSize:24}}>📝</span><span style={{fontWeight:700,fontSize:17,fontFamily:"'DM Sans',sans-serif"}}>Submit for Marking</span></>}
      </button>
    </>}
    {result&&<div style={{animation:"fadeUp .5s ease"}}>
      <div style={S.resCard}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
          <div style={{...S.scoreC, background:result.percentage>=70?"linear-gradient(135deg,#26DE81,#20C997)":result.percentage>=40?"linear-gradient(135deg,#F7B731,#FFA502)":"linear-gradient(135deg,#FF6B6B,#EE5A24)"}}>
            <div style={{fontSize:32,fontWeight:800,fontFamily:"'Space Mono',monospace"}}>{result.score}/{result.maxMarks}</div>
            <div style={{fontSize:13,opacity:.9}}>{result.percentage}%</div>
          </div>
        </div>
        <div style={{...S.gradeT, background:result.gradeIndicator==="Excellent"?"#D5F9E5":result.gradeIndicator==="Good"?"#D6EFF7":result.gradeIndicator==="Satisfactory"?"#FFF3D4":"#FFE0E0",
          color:result.gradeIndicator==="Excellent"?"#1B9E5C":result.gradeIndicator==="Good"?"#2980B9":result.gradeIndicator==="Satisfactory"?"#D4941A":"#C0392B"}}>
          {result.gradeIndicator==="Excellent"?"🌟":result.gradeIndicator==="Good"?"👍":result.gradeIndicator==="Satisfactory"?"📝":"💪"} {result.gradeIndicator}
        </div>
      </div>
      <div style={S.fbCard}><h4 style={{margin:"0 0 6px",fontSize:14,color:"#1B9E5C"}}>✅ What you did well</h4><p style={{margin:0,fontSize:13,lineHeight:1.6,color:"#333"}}>{result.feedback}</p></div>
      <div style={{...S.fbCard,borderLeftColor:"#F7B731"}}><h4 style={{margin:"0 0 6px",fontSize:14,color:"#D4941A"}}>🎯 How to improve</h4><p style={{margin:0,fontSize:13,lineHeight:1.6,color:"#333"}}>{result.improvements}</p></div>
      <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
        <button style={{...S.actBtn,background:c.bg,color:"#fff"}} onClick={()=>startQ(rn)}>Next Question →</button>
        <button style={{...S.actBtn,background:"#f0f0f0",color:"#333"}} onClick={()=>setScreen("home")}>Home</button>
      </div>
    </div>}
  </>;
}

function Stats({setScreen,history,sessions,totalMin,totalQ,oAvg,streak,subjStats,topicStats,resetAll}){
  const [confirm,setConfirm]=useState(false);
  const week=Array.from({length:7},(_,i)=>{const d=new Date(Date.now()-(6-i)*864e5);const ds=d.toISOString().slice(0,10);return{day:d.toLocaleDateString("en-GB",{weekday:"short"}),count:history.filter(h=>h.date.slice(0,10)===ds).length};});
  const mx=Math.max(...week.map(d=>d.count),1);
  const sb=SUBJECTS.map(s=>({subject:s,...subjStats(s)})).filter(s=>s.count);
  return <>
    <button onClick={()=>setScreen("home")} style={S.back}>← Home</button>
    <h1 style={{...S.hero,fontSize:26,marginBottom:4}}>📊 Your Progress</h1>
    <p style={{color:"#888",fontSize:13,margin:"0 0 20px"}}>Keep going, Becca — you're doing brilliantly!</p>
    <div style={S.sRow}>
      <Stat icon="🔥" val={streak} label="Streak" c="#FF6B6B"/>
      <Stat icon="✅" val={totalQ} label="Done" c="#4ECDC4"/>
      <Stat icon="📊" val={`${oAvg}%`} label="Avg" c="#F7B731"/>
      <Stat icon="⏱️" val={`${totalMin}m`} label="Time" c="#A55EEA"/>
    </div>
    <div style={S.chartC}>
      <h3 style={S.chartH}>This Week</h3>
      <div style={{display:"flex",alignItems:"flex-end",gap:8,height:90}}>
        {week.map((d,i)=><div key={i} style={{flex:1,textAlign:"center"}}>
          <div style={{height:`${Math.max(d.count/mx*70,4)}px`,background:d.count?"linear-gradient(180deg,#4ECDC4,#26DE81)":"#f0f0f0",borderRadius:5,margin:"0 auto",width:"70%"}}/>
          <div style={{fontSize:9,color:"#888",marginTop:5}}>{d.day}</div>
          {d.count>0&&<div style={{fontSize:9,fontWeight:700,color:"#1B9E5C"}}>{d.count}</div>}
        </div>)}
      </div>
    </div>
    {sb.length>0&&<div style={S.chartC}>
      <h3 style={S.chartH}>Subject Performance</h3>
      {sb.map(s=>{const c=SUBJECT_COLORS[s.subject]; return <div key={s.subject} style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
          <span style={{fontSize:12,fontWeight:600,color:"#1a1a2e"}}>{SUBJECT_ICONS[s.subject]} {s.subject}</span>
          <span style={{fontSize:12,fontWeight:700,color:c.dark}}>{s.avg}%</span>
        </div>
        <div style={{height:9,borderRadius:5,background:"#f0f0f0",overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:5,width:`${s.avg}%`,background:`linear-gradient(90deg,${c.bg}90,${c.bg})`,transition:"width .8s"}}/>
        </div>
        <div style={{fontSize:10,color:"#aaa",marginTop:2}}>{s.count} completed</div>
      </div>})}
    </div>}
    {history.length>0&&<div style={S.chartC}>
      <h3 style={S.chartH}>Recent Activity</h3>
      {history.slice(-10).reverse().map(h=>{const c=SUBJECT_COLORS[h.subject]||{bg:"#666"};
        return <div key={h.id} style={S.recent}>
          <span style={{fontSize:16}}>{SUBJECT_ICONS[h.subject]}</span>
          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:"#1a1a2e"}}>{h.topic}</div><div style={{fontSize:10,color:"#aaa"}}>{new Date(h.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</div></div>
          <div style={{fontWeight:800,fontSize:13,fontFamily:"'Space Mono',monospace",color:h.pct>=70?"#1B9E5C":h.pct>=40?"#D4941A":"#C0392B"}}>{h.score}/{h.marks}</div>
        </div>})}
    </div>}
    {SUBJECTS.filter(s=>topicStats(s).length>0).map(s=>{const ts=topicStats(s);const c=SUBJECT_COLORS[s];
      return <div key={s} style={S.chartC}>
        <h3 style={{...S.chartH,color:c.dark}}>{SUBJECT_ICONS[s]} {s} — Topics</h3>
        {ts.map(t=><div key={t.topic} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
          <div style={{flex:1,fontSize:11,color:"#555"}}>{t.topic}</div>
          <div style={{width:70,height:5,borderRadius:3,background:"#f0f0f0"}}><div style={{height:5,borderRadius:3,width:`${t.avg}%`,background:t.avg>=70?"#26DE81":t.avg>=40?"#F7B731":"#FF6B6B"}}/></div>
          <span style={{fontSize:11,fontWeight:700,color:"#555",minWidth:28}}>{t.avg}%</span>
        </div>)}
      </div>})}
    <div style={{marginTop:20,textAlign:"center"}}>
      {!confirm?<button onClick={()=>setConfirm(true)} style={{...S.actBtn,background:"#fff",color:"#C0392B",border:"1px solid #FFE0E0",fontSize:11}}>Reset All Data</button>
      :<div style={{display:"flex",gap:8,justifyContent:"center"}}>
        <button onClick={()=>{resetAll();setConfirm(false)}} style={{...S.actBtn,background:"#FF6B6B",color:"#fff"}}>Confirm</button>
        <button onClick={()=>setConfirm(false)} style={{...S.actBtn,background:"#f0f0f0",color:"#333"}}>Cancel</button>
      </div>}
    </div>
  </>;
}

function Stat({icon,val,label,c}){return <div style={{...S.statB,borderColor:`${c}30`}}>
  <div style={{fontSize:16}}>{icon}</div>
  <div style={{fontSize:18,fontWeight:800,fontFamily:"'Space Mono',monospace",color:c}}>{val}</div>
  <div style={{fontSize:9,color:"#888"}}>{label}</div>
</div>}

function NavBtn({icon,label,onClick}){return <button onClick={onClick} style={S.navBtn}>
  <span style={{fontSize:20}}>{icon}</span><span style={{fontSize:11,fontWeight:600,color:"#888"}}>{label}</span>
</button>}

const S={
  ctr:{minHeight:"100vh",background:"#FAFBFC",fontFamily:"'DM Sans',-apple-system,sans-serif",position:"relative",overflow:"hidden"},
  glow:{position:"absolute",top:-120,left:"50%",transform:"translateX(-50%)",width:600,height:300,background:"radial-gradient(ellipse at top,rgba(78,205,196,.12),transparent 70%)",pointerEvents:"none"},
  content:{maxWidth:480,margin:"0 auto",padding:"24px 20px 40px",position:"relative",zIndex:1},
  greet:{fontSize:13,color:"#aaa",margin:"0 0 4px",letterSpacing:.5},
  hero:{fontSize:30,fontWeight:800,margin:"0 0 6px",fontFamily:"'DM Sans',sans-serif",background:"linear-gradient(135deg,#1a1a2e,#4ECDC4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
  sub:{fontSize:14,color:"#888",margin:0},
  sRow:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:20},
  statB:{background:"#fff",borderRadius:14,padding:"12px 6px",textAlign:"center",border:"1.5px solid #f0f0f0",boxShadow:"0 2px 8px rgba(0,0,0,.03)",display:"flex",flexDirection:"column",alignItems:"center",gap:1},
  bigBtn:{width:"100%",padding:"16px 18px",borderRadius:16,border:"none",cursor:"pointer",marginBottom:24,background:"linear-gradient(135deg,#1a1a2e,#2d2d44)",color:"#fff",display:"flex",alignItems:"center",gap:14,boxShadow:"0 4px 20px rgba(26,26,46,.2)",textAlign:"left"},
  sec:{fontSize:17,fontWeight:800,color:"#1a1a2e",margin:"0 0 12px",fontFamily:"'DM Sans',sans-serif"},
  grid:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:16},
  card:{padding:"16px 12px",borderRadius:14,border:"1.5px solid",cursor:"pointer",textAlign:"center",background:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,.03)"},
  tag:{padding:"2px 8px",borderRadius:16,fontSize:10,fontWeight:700,display:"inline-block"},
  navRow:{display:"flex",justifyContent:"center",gap:14,marginTop:4},
  navBtn:{display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 22px",borderRadius:14,border:"1.5px solid #f0f0f0",background:"#fff",cursor:"pointer"},
  back:{background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:600,color:"#888",padding:"6px 0",marginBottom:10,fontFamily:"'DM Sans',sans-serif"},
  qCard:{width:"100%",padding:"14px",borderRadius:12,border:"1.5px solid #f0f0f0",background:"#fff",cursor:"pointer",marginBottom:8,textAlign:"left",boxShadow:"0 2px 8px rgba(0,0,0,.03)"},
  badge:{width:34,height:34,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:13,fontFamily:"'Space Mono',monospace",flexShrink:0},
  qBox:{background:"#fff",borderRadius:14,padding:"18px",border:"1.5px solid #e8e8e8",marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,.04)"},
  qText:{fontSize:14,lineHeight:1.7,color:"#1a1a2e",margin:0,whiteSpace:"pre-wrap",fontFamily:"'DM Sans',sans-serif"},
  ta:{width:"100%",padding:"14px",borderRadius:12,border:"2px solid #e8e8e8",fontSize:14,lineHeight:1.7,fontFamily:"'DM Sans',sans-serif",color:"#1a1a2e",resize:"vertical",marginBottom:10,outline:"none",background:"#fff",boxSizing:"border-box",minHeight:140},
  spin:{width:18,height:18,border:"3px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite"},
  resCard:{background:"#fff",borderRadius:18,padding:"24px 18px",border:"1.5px solid #e8e8e8",marginBottom:14,textAlign:"center",boxShadow:"0 4px 20px rgba(0,0,0,.06)"},
  scoreC:{width:100,height:100,borderRadius:"50%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#fff",boxShadow:"0 4px 20px rgba(0,0,0,.15)"},
  gradeT:{display:"inline-block",padding:"5px 18px",borderRadius:18,fontWeight:700,fontSize:13},
  fbCard:{background:"#fff",borderRadius:12,padding:"14px 16px",borderLeft:"4px solid #26DE81",marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,.03)"},
  actBtn:{padding:"10px 22px",borderRadius:12,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"'DM Sans',sans-serif"},
  topicRow:{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #f5f5f5"},
  chartC:{background:"#fff",borderRadius:16,padding:"18px",border:"1.5px solid #f0f0f0",marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,.04)"},
  chartH:{margin:"0 0 14px",fontSize:15,fontFamily:"'DM Sans',sans-serif",color:"#1a1a2e"},
  recent:{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #f5f5f5"},
};
