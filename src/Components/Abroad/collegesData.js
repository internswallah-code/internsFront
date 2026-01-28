const collegesData = [
  /* ===================== 🇺🇸 UNITED STATES ===================== */

  {
    id: 1,
    name: "Harvard Business School",
    country: "United States",
    specialization: "MBA",
  },
  {
    id: 2,
    name: "Stanford Graduate School of Business",
    country: "United States",
    specialization: "MBA",
  },
  {
    id: 3,
    name: "Wharton School, University of Pennsylvania",
    country: "United States",
    specialization: "MBA",
  },
  {
    id: 4,
    name: "MIT Sloan School of Management",
    country: "United States",
    specialization: "MBA",
  },
  {
    id: 5,
    name: "Booth School of Business, University of Chicago",
    country: "United States",
    specialization: "MBA",
  },
  {
    id: 6,
    name: "Kellogg School of Management, Northwestern University",
    country: "United States",
    specialization: "MBA",
  },

  {
    id: 7,
    name: "Stanford University",
    country: "United States",
    specialization: "MSc Computer Science",
  },
  {
    id: 8,
    name: "Massachusetts Institute of Technology",
    country: "United States",
    specialization: "MSc Computer Science",
  },
  {
    id: 9,
    name: "Carnegie Mellon University",
    country: "United States",
    specialization: "MSc Computer Science",
  },
  {
    id: 10,
    name: "University of California, Berkeley",
    country: "United States",
    specialization: "MSc Computer Science",
  },
  {
    id: 11,
    name: "Princeton University",
    country: "United States",
    specialization: "MSc Computer Science",
  },
  {
    id: 12,
    name: "University of Illinois Urbana-Champaign",
    country: "United States",
    specialization: "MSc Computer Science",
  },

  {
    id: 13,
    name: "Columbia University",
    country: "United States",
    specialization: "Data Science",
  },
  {
    id: 14,
    name: "New York University",
    country: "United States",
    specialization: "Data Science",
  },
  {
    id: 15,
    name: "University of Texas at Austin",
    country: "United States",
    specialization: "Data Science",
  },
  {
    id: 16,
    name: "University of Washington",
    country: "United States",
    specialization: "Data Science",
  },
  {
    id: 17,
    name: "Johns Hopkins University",
    country: "United States",
    specialization: "Data Science",
  },
  {
    id: 18,
    name: "University of California, San Diego",
    country: "United States",
    specialization: "Data Science",
  },

  {
    id: 19,
    name: "Carnegie Mellon University",
    country: "United States",
    specialization: "Artificial Intelligence",
  },
  {
    id: 20,
    name: "Stanford University",
    country: "United States",
    specialization: "Artificial Intelligence",
  },
  {
    id: 21,
    name: "Massachusetts Institute of Technology",
    country: "United States",
    specialization: "Artificial Intelligence",
  },
  {
    id: 22,
    name: "University of California, Berkeley",
    country: "United States",
    specialization: "Artificial Intelligence",
  },
  {
    id: 23,
    name: "Princeton University",
    country: "United States",
    specialization: "Artificial Intelligence",
  },
  {
    id: 24,
    name: "University of Southern California",
    country: "United States",
    specialization: "Artificial Intelligence",
  },

  {
    id: 25,
    name: "Columbia Business School",
    country: "United States",
    specialization: "Finance",
  },
  {
    id: 26,
    name: "NYU Stern School of Business",
    country: "United States",
    specialization: "Finance",
  },
  {
    id: 27,
    name: "Wharton School, University of Pennsylvania",
    country: "United States",
    specialization: "Finance",
  },
  {
    id: 28,
    name: "Booth School of Business, University of Chicago",
    country: "United States",
    specialization: "Finance",
  },
  {
    id: 29,
    name: "UCLA Anderson School of Management",
    country: "United States",
    specialization: "Finance",
  },
  {
    id: 30,
    name: "Cornell SC Johnson College of Business",
    country: "United States",
    specialization: "Finance",
  },

  {
    id: 31,
    name: "Northwestern University",
    country: "United States",
    specialization: "Marketing",
  },
  {
    id: 32,
    name: "University of Pennsylvania",
    country: "United States",
    specialization: "Marketing",
  },
  {
    id: 33,
    name: "University of Michigan, Ross School of Business",
    country: "United States",
    specialization: "Marketing",
  },
  {
    id: 34,
    name: "New York University",
    country: "United States",
    specialization: "Marketing",
  },
  {
    id: 35,
    name: "University of California, Los Angeles",
    country: "United States",
    specialization: "Marketing",
  },
  {
    id: 36,
    name: "Duke University, Fuqua School of Business",
    country: "United States",
    specialization: "Marketing",
  },

  /* ===================== 🇨🇦 CANADA ===================== */

  {
    id: 37,
    name: "Rotman School of Management, University of Toronto",
    country: "Canada",
    specialization: "MBA",
  },
  {
    id: 38,
    name: "Schulich School of Business, York University",
    country: "Canada",
    specialization: "MBA",
  },
  {
    id: 39,
    name: "Ivey Business School, Western University",
    country: "Canada",
    specialization: "MBA",
  },
  {
    id: 40,
    name: "Desautels Faculty of Management, McGill University",
    country: "Canada",
    specialization: "MBA",
  },
  {
    id: 41,
    name: "Sauder School of Business, University of British Columbia",
    country: "Canada",
    specialization: "MBA",
  },

  {
    id: 42,
    name: "University of Toronto",
    country: "Canada",
    specialization: "MSc Computer Science",
  },
  {
    id: 43,
    name: "University of Waterloo",
    country: "Canada",
    specialization: "MSc Computer Science",
  },
  {
    id: 44,
    name: "University of British Columbia",
    country: "Canada",
    specialization: "MSc Computer Science",
  },
  {
    id: 45,
    name: "McGill University",
    country: "Canada",
    specialization: "MSc Computer Science",
  },
  {
    id: 46,
    name: "Simon Fraser University",
    country: "Canada",
    specialization: "MSc Computer Science",
  },

  {
    id: 47,
    name: "University of Toronto",
    country: "Canada",
    specialization: "Data Science",
  },
  {
    id: 48,
    name: "University of British Columbia",
    country: "Canada",
    specialization: "Data Science",
  },
  {
    id: 49,
    name: "University of Waterloo",
    country: "Canada",
    specialization: "Data Science",
  },
  {
    id: 50,
    name: "York University",
    country: "Canada",
    specialization: "Data Science",
  },
  {
    id: 51,
    name: "University of Calgary",
    country: "Canada",
    specialization: "Data Science",
  },

  {
    id: 52,
    name: "University of Montreal",
    country: "Canada",
    specialization: "Artificial Intelligence",
  },
  {
    id: 53,
    name: "McGill University",
    country: "Canada",
    specialization: "Artificial Intelligence",
  },
  {
    id: 54,
    name: "University of Toronto",
    country: "Canada",
    specialization: "Artificial Intelligence",
  },
  {
    id: 55,
    name: "Mila – Quebec Artificial Intelligence Institute",
    country: "Canada",
    specialization: "Artificial Intelligence",
  },
  {
    id: 56,
    name: "University of Alberta",
    country: "Canada",
    specialization: "Artificial Intelligence",
  },

  {
    id: 57,
    name: "Rotman School of Management, University of Toronto",
    country: "Canada",
    specialization: "Finance",
  },
  {
    id: 58,
    name: "Desautels Faculty of Management, McGill University",
    country: "Canada",
    specialization: "Finance",
  },
  {
    id: 59,
    name: "Ivey Business School, Western University",
    country: "Canada",
    specialization: "Finance",
  },
  {
    id: 60,
    name: "Sauder School of Business, University of British Columbia",
    country: "Canada",
    specialization: "Finance",
  },
  {
    id: 61,
    name: "Schulich School of Business, York University",
    country: "Canada",
    specialization: "Finance",
  },

  {
    id: 62,
    name: "York University",
    country: "Canada",
    specialization: "Marketing",
  },
  {
    id: 63,
    name: "University of British Columbia",
    country: "Canada",
    specialization: "Marketing",
  },
  {
    id: 64,
    name: "University of Toronto",
    country: "Canada",
    specialization: "Marketing",
  },
  {
    id: 65,
    name: "Western University",
    country: "Canada",
    specialization: "Marketing",
  },
  {
    id: 66,
    name: "McMaster University",
    country: "Canada",
    specialization: "Marketing",
  },

  /* ===================== 🇬🇧 UNITED KINGDOM ===================== */

  {
    id: 67,
    name: "London Business School",
    country: "United Kingdom",
    specialization: "MBA",
  },
  {
    id: 68,
    name: "University of Oxford – Saïd Business School",
    country: "United Kingdom",
    specialization: "MBA",
  },
  {
    id: 69,
    name: "University of Cambridge – Judge Business School",
    country: "United Kingdom",
    specialization: "MBA",
  },
  {
    id: 70,
    name: "Imperial College Business School",
    country: "United Kingdom",
    specialization: "MBA",
  },
  {
    id: 71,
    name: "Warwick Business School",
    country: "United Kingdom",
    specialization: "MBA",
  },
  {
    id: 72,
    name: "Alliance Manchester Business School",
    country: "United Kingdom",
    specialization: "MBA",
  },

  {
    id: 73,
    name: "University of Oxford",
    country: "United Kingdom",
    specialization: "MSc Computer Science",
  },
  {
    id: 74,
    name: "University of Cambridge",
    country: "United Kingdom",
    specialization: "MSc Computer Science",
  },
  {
    id: 75,
    name: "Imperial College London",
    country: "United Kingdom",
    specialization: "MSc Computer Science",
  },
  {
    id: 76,
    name: "University College London",
    country: "United Kingdom",
    specialization: "MSc Computer Science",
  },
  {
    id: 77,
    name: "University of Edinburgh",
    country: "United Kingdom",
    specialization: "MSc Computer Science",
  },
  {
    id: 78,
    name: "University of Manchester",
    country: "United Kingdom",
    specialization: "MSc Computer Science",
  },

  {
    id: 79,
    name: "Imperial College London",
    country: "United Kingdom",
    specialization: "Data Science",
  },
  {
    id: 80,
    name: "University College London",
    country: "United Kingdom",
    specialization: "Data Science",
  },
  {
    id: 81,
    name: "University of Edinburgh",
    country: "United Kingdom",
    specialization: "Data Science",
  },
  {
    id: 82,
    name: "King’s College London",
    country: "United Kingdom",
    specialization: "Data Science",
  },
  {
    id: 83,
    name: "University of Bristol",
    country: "United Kingdom",
    specialization: "Data Science",
  },
  {
    id: 84,
    name: "University of Warwick",
    country: "United Kingdom",
    specialization: "Data Science",
  },

  {
    id: 85,
    name: "University of Oxford",
    country: "United Kingdom",
    specialization: "Artificial Intelligence",
  },
  {
    id: 86,
    name: "University of Cambridge",
    country: "United Kingdom",
    specialization: "Artificial Intelligence",
  },
  {
    id: 87,
    name: "Imperial College London",
    country: "United Kingdom",
    specialization: "Artificial Intelligence",
  },
  {
    id: 88,
    name: "University College London",
    country: "United Kingdom",
    specialization: "Artificial Intelligence",
  },
  {
    id: 89,
    name: "University of Edinburgh",
    country: "United Kingdom",
    specialization: "Artificial Intelligence",
  },
  {
    id: 90,
    name: "University of Sheffield",
    country: "United Kingdom",
    specialization: "Artificial Intelligence",
  },

  {
    id: 91,
    name: "London School of Economics and Political Science",
    country: "United Kingdom",
    specialization: "Finance",
  },
  {
    id: 92,
    name: "University of Oxford – Saïd Business School",
    country: "United Kingdom",
    specialization: "Finance",
  },
  {
    id: 93,
    name: "University of Cambridge – Judge Business School",
    country: "United Kingdom",
    specialization: "Finance",
  },
  {
    id: 94,
    name: "Imperial College Business School",
    country: "United Kingdom",
    specialization: "Finance",
  },
  {
    id: 95,
    name: "Warwick Business School",
    country: "United Kingdom",
    specialization: "Finance",
  },
  {
    id: 96,
    name: "Cass Business School (Bayes)",
    country: "United Kingdom",
    specialization: "Finance",
  },

  {
    id: 97,
    name: "University of Leeds",
    country: "United Kingdom",
    specialization: "Marketing",
  },
  {
    id: 98,
    name: "University of Manchester",
    country: "United Kingdom",
    specialization: "Marketing",
  },
  {
    id: 99,
    name: "University of Nottingham",
    country: "United Kingdom",
    specialization: "Marketing",
  },
  {
    id: 100,
    name: "University of Birmingham",
    country: "United Kingdom",
    specialization: "Marketing",
  },
  {
    id: 101,
    name: "King’s College London",
    country: "United Kingdom",
    specialization: "Marketing",
  },
  {
    id: 102,
    name: "University of Strathclyde",
    country: "United Kingdom",
    specialization: "Marketing",
  },

  /* ===================== 🇩🇪 GERMANY ===================== */

  {
    id: 103,
    name: "University of Mannheim Business School",
    country: "Germany",
    specialization: "MBA",
  },
  {
    id: 104,
    name: "Frankfurt School of Finance & Management",
    country: "Germany",
    specialization: "MBA",
  },
  { id: 105, name: "ESMT Berlin", country: "Germany", specialization: "MBA" },
  {
    id: 106,
    name: "WHU – Otto Beisheim School of Management",
    country: "Germany",
    specialization: "MBA",
  },
  {
    id: 107,
    name: "HHL Leipzig Graduate School of Management",
    country: "Germany",
    specialization: "MBA",
  },

  {
    id: 108,
    name: "Technical University of Munich",
    country: "Germany",
    specialization: "MSc Computer Science",
  },
  {
    id: 109,
    name: "RWTH Aachen University",
    country: "Germany",
    specialization: "MSc Computer Science",
  },
  {
    id: 110,
    name: "LMU Munich",
    country: "Germany",
    specialization: "MSc Computer Science",
  },
  {
    id: 111,
    name: "Technical University of Berlin",
    country: "Germany",
    specialization: "MSc Computer Science",
  },
  {
    id: 112,
    name: "University of Stuttgart",
    country: "Germany",
    specialization: "MSc Computer Science",
  },

  {
    id: 113,
    name: "University of Heidelberg",
    country: "Germany",
    specialization: "Data Science",
  },
  {
    id: 114,
    name: "Technical University of Munich",
    country: "Germany",
    specialization: "Data Science",
  },
  {
    id: 115,
    name: "University of Bonn",
    country: "Germany",
    specialization: "Data Science",
  },
  {
    id: 116,
    name: "University of Freiburg",
    country: "Germany",
    specialization: "Data Science",
  },
  {
    id: 117,
    name: "University of Cologne",
    country: "Germany",
    specialization: "Data Science",
  },

  {
    id: 118,
    name: "Technical University of Munich",
    country: "Germany",
    specialization: "Artificial Intelligence",
  },
  {
    id: 119,
    name: "DFKI – German Research Center for Artificial Intelligence",
    country: "Germany",
    specialization: "Artificial Intelligence",
  },
  {
    id: 120,
    name: "RWTH Aachen University",
    country: "Germany",
    specialization: "Artificial Intelligence",
  },
  {
    id: 121,
    name: "Technical University of Berlin",
    country: "Germany",
    specialization: "Artificial Intelligence",
  },
  {
    id: 122,
    name: "University of Saarland",
    country: "Germany",
    specialization: "Artificial Intelligence",
  },

  {
    id: 123,
    name: "Frankfurt School of Finance & Management",
    country: "Germany",
    specialization: "Finance",
  },
  {
    id: 124,
    name: "University of Mannheim",
    country: "Germany",
    specialization: "Finance",
  },
  {
    id: 125,
    name: "WHU – Otto Beisheim School of Management",
    country: "Germany",
    specialization: "Finance",
  },
  {
    id: 126,
    name: "ESMT Berlin",
    country: "Germany",
    specialization: "Finance",
  },
  {
    id: 127,
    name: "Goethe University Frankfurt",
    country: "Germany",
    specialization: "Finance",
  },

  {
    id: 128,
    name: "University of Cologne",
    country: "Germany",
    specialization: "Marketing",
  },
  {
    id: 129,
    name: "University of Mannheim",
    country: "Germany",
    specialization: "Marketing",
  },
  {
    id: 130,
    name: "RWTH Aachen University",
    country: "Germany",
    specialization: "Marketing",
  },
  {
    id: 131,
    name: "Technical University of Munich",
    country: "Germany",
    specialization: "Marketing",
  },
  {
    id: 132,
    name: "Humboldt University of Berlin",
    country: "Germany",
    specialization: "Marketing",
  },

  /* ===================== 🇦🇺 AUSTRALIA ===================== */

  {
    id: 133,
    name: "Melbourne Business School, University of Melbourne",
    country: "Australia",
    specialization: "MBA",
  },
  {
    id: 134,
    name: "AGSM, University of New South Wales",
    country: "Australia",
    specialization: "MBA",
  },
  {
    id: 135,
    name: "Monash Business School",
    country: "Australia",
    specialization: "MBA",
  },
  {
    id: 136,
    name: "University of Sydney Business School",
    country: "Australia",
    specialization: "MBA",
  },
  {
    id: 137,
    name: "Macquarie Business School",
    country: "Australia",
    specialization: "MBA",
  },
  {
    id: 138,
    name: "University of Queensland Business School",
    country: "Australia",
    specialization: "MBA",
  },

  {
    id: 139,
    name: "University of Melbourne",
    country: "Australia",
    specialization: "MSc Computer Science",
  },
  {
    id: 140,
    name: "Australian National University",
    country: "Australia",
    specialization: "MSc Computer Science",
  },
  {
    id: 141,
    name: "University of New South Wales",
    country: "Australia",
    specialization: "MSc Computer Science",
  },
  {
    id: 142,
    name: "Monash University",
    country: "Australia",
    specialization: "MSc Computer Science",
  },
  {
    id: 143,
    name: "University of Sydney",
    country: "Australia",
    specialization: "MSc Computer Science",
  },
  {
    id: 144,
    name: "University of Queensland",
    country: "Australia",
    specialization: "MSc Computer Science",
  },

  {
    id: 145,
    name: "University of Melbourne",
    country: "Australia",
    specialization: "Data Science",
  },
  {
    id: 146,
    name: "University of Sydney",
    country: "Australia",
    specialization: "Data Science",
  },
  {
    id: 147,
    name: "Monash University",
    country: "Australia",
    specialization: "Data Science",
  },
  {
    id: 148,
    name: "University of New South Wales",
    country: "Australia",
    specialization: "Data Science",
  },
  {
    id: 149,
    name: "Australian National University",
    country: "Australia",
    specialization: "Data Science",
  },
  {
    id: 150,
    name: "RMIT University",
    country: "Australia",
    specialization: "Data Science",
  },

  {
    id: 151,
    name: "Australian National University",
    country: "Australia",
    specialization: "Artificial Intelligence",
  },
  {
    id: 152,
    name: "University of Melbourne",
    country: "Australia",
    specialization: "Artificial Intelligence",
  },
  {
    id: 153,
    name: "University of New South Wales",
    country: "Australia",
    specialization: "Artificial Intelligence",
  },
  {
    id: 154,
    name: "Monash University",
    country: "Australia",
    specialization: "Artificial Intelligence",
  },
  {
    id: 155,
    name: "University of Sydney",
    country: "Australia",
    specialization: "Artificial Intelligence",
  },
  {
    id: 156,
    name: "Queensland University of Technology",
    country: "Australia",
    specialization: "Artificial Intelligence",
  },

  {
    id: 157,
    name: "University of Melbourne",
    country: "Australia",
    specialization: "Finance",
  },
  {
    id: 158,
    name: "University of New South Wales",
    country: "Australia",
    specialization: "Finance",
  },
  {
    id: 159,
    name: "Monash University",
    country: "Australia",
    specialization: "Finance",
  },
  {
    id: 160,
    name: "University of Sydney",
    country: "Australia",
    specialization: "Finance",
  },
  {
    id: 161,
    name: "Macquarie University",
    country: "Australia",
    specialization: "Finance",
  },
  {
    id: 162,
    name: "University of Queensland",
    country: "Australia",
    specialization: "Finance",
  },

  {
    id: 163,
    name: "Monash University",
    country: "Australia",
    specialization: "Marketing",
  },
  {
    id: 164,
    name: "University of Melbourne",
    country: "Australia",
    specialization: "Marketing",
  },
  {
    id: 165,
    name: "University of Sydney",
    country: "Australia",
    specialization: "Marketing",
  },
  {
    id: 166,
    name: "University of New South Wales",
    country: "Australia",
    specialization: "Marketing",
  },
  {
    id: 167,
    name: "RMIT University",
    country: "Australia",
    specialization: "Marketing",
  },
  {
    id: 168,
    name: "Deakin University",
    country: "Australia",
    specialization: "Marketing",
  },

  /* ===================== 🇫🇷 FRANCE ===================== */

  { id: 169, name: "INSEAD", country: "France", specialization: "MBA" },
  { id: 170, name: "HEC Paris", country: "France", specialization: "MBA" },
  {
    id: 171,
    name: "ESSEC Business School",
    country: "France",
    specialization: "MBA",
  },
  {
    id: 172,
    name: "ESCP Business School",
    country: "France",
    specialization: "MBA",
  },

  {
    id: 173,
    name: "École Polytechnique",
    country: "France",
    specialization: "MSc Computer Science",
  },
  {
    id: 174,
    name: "Sorbonne University",
    country: "France",
    specialization: "MSc Computer Science",
  },
  {
    id: 175,
    name: "Université Paris-Saclay",
    country: "France",
    specialization: "MSc Computer Science",
  },
  {
    id: 176,
    name: "Grenoble Institute of Technology",
    country: "France",
    specialization: "MSc Computer Science",
  },

  {
    id: 177,
    name: "Sorbonne University",
    country: "France",
    specialization: "Data Science",
  },
  {
    id: 178,
    name: "École Polytechnique",
    country: "France",
    specialization: "Data Science",
  },
  {
    id: 179,
    name: "Université Paris-Dauphine",
    country: "France",
    specialization: "Data Science",
  },
  {
    id: 180,
    name: "INRIA Paris",
    country: "France",
    specialization: "Data Science",
  },

  {
    id: 181,
    name: "Université Paris-Saclay",
    country: "France",
    specialization: "Artificial Intelligence",
  },
  {
    id: 182,
    name: "École Polytechnique",
    country: "France",
    specialization: "Artificial Intelligence",
  },
  {
    id: 183,
    name: "INRIA",
    country: "France",
    specialization: "Artificial Intelligence",
  },
  {
    id: 184,
    name: "Sorbonne University",
    country: "France",
    specialization: "Artificial Intelligence",
  },

  { id: 185, name: "HEC Paris", country: "France", specialization: "Finance" },
  {
    id: 186,
    name: "ESSEC Business School",
    country: "France",
    specialization: "Finance",
  },
  {
    id: 187,
    name: "Université Paris-Dauphine",
    country: "France",
    specialization: "Finance",
  },
  {
    id: 188,
    name: "ESCP Business School",
    country: "France",
    specialization: "Finance",
  },

  {
    id: 189,
    name: "ESCP Business School",
    country: "France",
    specialization: "Marketing",
  },
  {
    id: 190,
    name: "HEC Paris",
    country: "France",
    specialization: "Marketing",
  },
  {
    id: 191,
    name: "ESSEC Business School",
    country: "France",
    specialization: "Marketing",
  },
  {
    id: 192,
    name: "KEDGE Business School",
    country: "France",
    specialization: "Marketing",
  },

  /* ===================== 🇷🇺 RUSSIA ===================== */

  {
    id: 193,
    name: "Higher School of Economics",
    country: "Russia",
    specialization: "MBA",
  },
  {
    id: 194,
    name: "Skolkovo Moscow School of Management",
    country: "Russia",
    specialization: "MBA",
  },
  {
    id: 195,
    name: "Lomonosov Moscow State University",
    country: "Russia",
    specialization: "MBA",
  },
  {
    id: 196,
    name: "Saint Petersburg State University",
    country: "Russia",
    specialization: "MBA",
  },
  {
    id: 197,
    name: "MGIMO University",
    country: "Russia",
    specialization: "MBA",
  },
  {
    id: 198,
    name: "RANEPA Graduate School of Management",
    country: "Russia",
    specialization: "MBA",
  },
  {
    id: 199,
    name: "Ural Federal University Graduate School of Economics",
    country: "Russia",
    specialization: "MBA",
  },

  {
    id: 200,
    name: "Lomonosov Moscow State University",
    country: "Russia",
    specialization: "MSc Computer Science",
  },
  {
    id: 201,
    name: "Moscow Institute of Physics and Technology",
    country: "Russia",
    specialization: "MSc Computer Science",
  },
  {
    id: 202,
    name: "Saint Petersburg State University",
    country: "Russia",
    specialization: "MSc Computer Science",
  },
  {
    id: 203,
    name: "Higher School of Economics",
    country: "Russia",
    specialization: "MSc Computer Science",
  },
  {
    id: 204,
    name: "ITMO University",
    country: "Russia",
    specialization: "MSc Computer Science",
  },
  {
    id: 205,
    name: "Bauman Moscow State Technical University",
    country: "Russia",
    specialization: "MSc Computer Science",
  },
  {
    id: 206,
    name: "Novosibirsk State University",
    country: "Russia",
    specialization: "MSc Computer Science",
  },

  {
    id: 207,
    name: "Higher School of Economics",
    country: "Russia",
    specialization: "Data Science",
  },
  {
    id: 208,
    name: "Lomonosov Moscow State University",
    country: "Russia",
    specialization: "Data Science",
  },
  {
    id: 209,
    name: "ITMO University",
    country: "Russia",
    specialization: "Data Science",
  },
  {
    id: 210,
    name: "Skolkovo Institute of Science and Technology",
    country: "Russia",
    specialization: "Data Science",
  },
  {
    id: 211,
    name: "Saint Petersburg State University",
    country: "Russia",
    specialization: "Data Science",
  },
  {
    id: 212,
    name: "Novosibirsk State University",
    country: "Russia",
    specialization: "Data Science",
  },
  {
    id: 213,
    name: "Ural Federal University",
    country: "Russia",
    specialization: "Data Science",
  },

  {
    id: 214,
    name: "Moscow Institute of Physics and Technology",
    country: "Russia",
    specialization: "Artificial Intelligence",
  },
  {
    id: 215,
    name: "ITMO University",
    country: "Russia",
    specialization: "Artificial Intelligence",
  },
  {
    id: 216,
    name: "Higher School of Economics",
    country: "Russia",
    specialization: "Artificial Intelligence",
  },
  {
    id: 217,
    name: "Skolkovo Institute of Science and Technology",
    country: "Russia",
    specialization: "Artificial Intelligence",
  },
  {
    id: 218,
    name: "Lomonosov Moscow State University",
    country: "Russia",
    specialization: "Artificial Intelligence",
  },
  {
    id: 219,
    name: "Bauman Moscow State Technical University",
    country: "Russia",
    specialization: "Artificial Intelligence",
  },
  {
    id: 220,
    name: "Saint Petersburg State University",
    country: "Russia",
    specialization: "Artificial Intelligence",
  },

  {
    id: 221,
    name: "Higher School of Economics",
    country: "Russia",
    specialization: "Finance",
  },
  {
    id: 222,
    name: "MGIMO University",
    country: "Russia",
    specialization: "Finance",
  },
  {
    id: 223,
    name: "Skolkovo Moscow School of Management",
    country: "Russia",
    specialization: "Finance",
  },
  {
    id: 224,
    name: "Lomonosov Moscow State University",
    country: "Russia",
    specialization: "Finance",
  },
  {
    id: 225,
    name: "Saint Petersburg State University",
    country: "Russia",
    specialization: "Finance",
  },
  {
    id: 226,
    name: "RANEPA Graduate School of Management",
    country: "Russia",
    specialization: "Finance",
  },
  {
    id: 227,
    name: "Ural Federal University",
    country: "Russia",
    specialization: "Finance",
  },

  {
    id: 228,
    name: "Higher School of Economics",
    country: "Russia",
    specialization: "Marketing",
  },
  {
    id: 229,
    name: "Skolkovo Moscow School of Management",
    country: "Russia",
    specialization: "Marketing",
  },
  {
    id: 230,
    name: "Saint Petersburg State University",
    country: "Russia",
    specialization: "Marketing",
  },
  {
    id: 231,
    name: "MGIMO University",
    country: "Russia",
    specialization: "Marketing",
  },
  {
    id: 232,
    name: "Lomonosov Moscow State University",
    country: "Russia",
    specialization: "Marketing",
  },
  {
    id: 233,
    name: "RANEPA Graduate School of Management",
    country: "Russia",
    specialization: "Marketing",
  },
  {
    id: 234,
    name: "Ural Federal University",
    country: "Russia",
    specialization: "Marketing",
  },

  /* ===================== 🇸🇬 SINGAPORE ===================== */

  {
    id: 235,
    name: "INSEAD Asia Campus",
    country: "Singapore",
    specialization: "MBA",
  },
  {
    id: 236,
    name: "NUS Business School",
    country: "Singapore",
    specialization: "MBA",
  },
  {
    id: 237,
    name: "Nanyang Business School, NTU",
    country: "Singapore",
    specialization: "MBA",
  },
  {
    id: 238,
    name: "Singapore Management University",
    country: "Singapore",
    specialization: "MBA",
  },
  {
    id: 239,
    name: "Lee Kong Chian School of Business, SMU",
    country: "Singapore",
    specialization: "MBA",
  },

  {
    id: 240,
    name: "National University of Singapore",
    country: "Singapore",
    specialization: "MSc Computer Science",
  },
  {
    id: 241,
    name: "Nanyang Technological University",
    country: "Singapore",
    specialization: "MSc Computer Science",
  },
  {
    id: 242,
    name: "Singapore Management University",
    country: "Singapore",
    specialization: "MSc Computer Science",
  },
  {
    id: 243,
    name: "Singapore Institute of Technology",
    country: "Singapore",
    specialization: "MSc Computer Science",
  },
  {
    id: 244,
    name: "Singapore University of Technology and Design",
    country: "Singapore",
    specialization: "MSc Computer Science",
  },

  {
    id: 245,
    name: "National University of Singapore",
    country: "Singapore",
    specialization: "Data Science",
  },
  {
    id: 246,
    name: "Nanyang Technological University",
    country: "Singapore",
    specialization: "Data Science",
  },
  {
    id: 247,
    name: "Singapore Management University",
    country: "Singapore",
    specialization: "Data Science",
  },
  {
    id: 248,
    name: "Singapore Institute of Technology",
    country: "Singapore",
    specialization: "Data Science",
  },
  {
    id: 249,
    name: "Singapore University of Technology and Design",
    country: "Singapore",
    specialization: "Data Science",
  },

  {
    id: 250,
    name: "National University of Singapore",
    country: "Singapore",
    specialization: "Artificial Intelligence",
  },
  {
    id: 251,
    name: "Nanyang Technological University",
    country: "Singapore",
    specialization: "Artificial Intelligence",
  },
  {
    id: 252,
    name: "Singapore University of Technology and Design",
    country: "Singapore",
    specialization: "Artificial Intelligence",
  },
  {
    id: 253,
    name: "A*STAR Graduate Academy",
    country: "Singapore",
    specialization: "Artificial Intelligence",
  },
  {
    id: 254,
    name: "Singapore Institute of Technology",
    country: "Singapore",
    specialization: "Artificial Intelligence",
  },

  {
    id: 255,
    name: "NUS Business School",
    country: "Singapore",
    specialization: "Finance",
  },
  {
    id: 256,
    name: "Lee Kong Chian School of Business, SMU",
    country: "Singapore",
    specialization: "Finance",
  },
  {
    id: 257,
    name: "Nanyang Business School, NTU",
    country: "Singapore",
    specialization: "Finance",
  },
  {
    id: 258,
    name: "INSEAD Asia Campus",
    country: "Singapore",
    specialization: "Finance",
  },
  {
    id: 259,
    name: "Singapore Management University",
    country: "Singapore",
    specialization: "Finance",
  },

  {
    id: 260,
    name: "Nanyang Business School, NTU",
    country: "Singapore",
    specialization: "Marketing",
  },
  {
    id: 261,
    name: "NUS Business School",
    country: "Singapore",
    specialization: "Marketing",
  },
  {
    id: 262,
    name: "Lee Kong Chian School of Business, SMU",
    country: "Singapore",
    specialization: "Marketing",
  },
  {
    id: 263,
    name: "Singapore Management University",
    country: "Singapore",
    specialization: "Marketing",
  },
  {
    id: 264,
    name: "INSEAD Asia Campus",
    country: "Singapore",
    specialization: "Marketing",
  },

  /* ===================== 🇯🇵 JAPAN ===================== */

  {
    id: 265,
    name: "Hitotsubashi University Business School",
    country: "Japan",
    specialization: "MBA",
  },
  {
    id: 266,
    name: "Keio Business School",
    country: "Japan",
    specialization: "MBA",
  },
  {
    id: 267,
    name: "Waseda Business School",
    country: "Japan",
    specialization: "MBA",
  },
  {
    id: 268,
    name: "NUCB Business School",
    country: "Japan",
    specialization: "MBA",
  },

  {
    id: 269,
    name: "University of Tokyo",
    country: "Japan",
    specialization: "MSc Computer Science",
  },
  {
    id: 270,
    name: "Kyoto University",
    country: "Japan",
    specialization: "MSc Computer Science",
  },
  {
    id: 271,
    name: "Osaka University",
    country: "Japan",
    specialization: "MSc Computer Science",
  },
  {
    id: 272,
    name: "Tokyo Institute of Technology",
    country: "Japan",
    specialization: "MSc Computer Science",
  },

  {
    id: 273,
    name: "University of Tokyo",
    country: "Japan",
    specialization: "Data Science",
  },
  {
    id: 274,
    name: "Keio University",
    country: "Japan",
    specialization: "Data Science",
  },
  {
    id: 275,
    name: "Waseda University",
    country: "Japan",
    specialization: "Data Science",
  },
  {
    id: 276,
    name: "Nagoya University",
    country: "Japan",
    specialization: "Data Science",
  },

  {
    id: 277,
    name: "University of Tokyo",
    country: "Japan",
    specialization: "Artificial Intelligence",
  },
  {
    id: 278,
    name: "Tokyo Institute of Technology",
    country: "Japan",
    specialization: "Artificial Intelligence",
  },
  {
    id: 279,
    name: "Osaka University",
    country: "Japan",
    specialization: "Artificial Intelligence",
  },
  {
    id: 280,
    name: "RIKEN Center for Advanced Intelligence Project",
    country: "Japan",
    specialization: "Artificial Intelligence",
  },

  {
    id: 281,
    name: "Hitotsubashi University",
    country: "Japan",
    specialization: "Finance",
  },
  {
    id: 282,
    name: "Keio University",
    country: "Japan",
    specialization: "Finance",
  },
  {
    id: 283,
    name: "Waseda University",
    country: "Japan",
    specialization: "Finance",
  },
  {
    id: 284,
    name: "University of Tokyo",
    country: "Japan",
    specialization: "Finance",
  },

  {
    id: 285,
    name: "Waseda University",
    country: "Japan",
    specialization: "Marketing",
  },
  {
    id: 286,
    name: "Keio University",
    country: "Japan",
    specialization: "Marketing",
  },
  {
    id: 287,
    name: "Hitotsubashi University",
    country: "Japan",
    specialization: "Marketing",
  },
  {
    id: 288,
    name: "Meiji University",
    country: "Japan",
    specialization: "Marketing",
  },
];

export default collegesData;
