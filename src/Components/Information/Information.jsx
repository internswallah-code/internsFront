import { useState } from "react"
import { Clock, TrendingUp, ExternalLink } from "lucide-react"

export default function InformationPage() {
  const [activeTab, setActiveTab] = useState("news")
  const [expandedCards, setExpandedCards] = useState(new Set())

  const techNews = [
    {
      id: 1,
      title: "AI Revolution: ChatGPT-5 Expected to Launch in 2024",
      summary: "OpenAI hints at major breakthrough in artificial intelligence with improved reasoning capabilities.",
      detailedContent:
        "OpenAI's upcoming ChatGPT-5 is set to revolutionize the AI landscape with unprecedented reasoning capabilities. The new model features enhanced multimodal understanding, allowing it to process text, images, and audio simultaneously. Industry experts predict this will lead to a 300% increase in AI-related job opportunities, particularly in prompt engineering, AI safety, and machine learning operations. The model's improved context window of 2 million tokens will enable more sophisticated applications in software development, content creation, and data analysis. Companies are already preparing for integration, with early beta testing showing 40% improvement in code generation accuracy.",
      time: "2 hours ago",
      category: "AI/ML",
      trending: true,
    },
    {
      id: 2,
      title: "Meta Announces New VR Headset with Advanced Haptic Feedback",
      summary: "The latest Quest headset promises more immersive virtual reality experiences for developers.",
      detailedContent:
        "Meta's Quest 4 introduces groundbreaking haptic feedback technology that simulates touch, temperature, and texture sensations. The device features 4K per eye resolution, 120Hz refresh rate, and wireless connectivity with sub-20ms latency. This advancement is creating new opportunities in VR development, UX design for immersive experiences, and haptic technology engineering. The headset's integration with Meta's Horizon Workrooms is expected to accelerate remote work adoption, with companies like Microsoft and Google already announcing partnerships. Early developers report 60% improvement in user engagement metrics, leading to increased demand for VR content creators and 3D environment designers.",
      time: "4 hours ago",
      category: "VR/AR",
      trending: false,
    },
    {
      id: 3,
      title: "Cybersecurity Threats Rise by 40% in Tech Industry",
      summary: "New report shows increasing demand for cybersecurity professionals across all sectors.",
      detailedContent:
        "The latest cybersecurity report reveals a 40% increase in sophisticated attacks targeting tech companies, with ransomware and AI-powered phishing leading the threats. This surge has created an unprecedented demand for cybersecurity professionals, with salaries increasing by 25% year-over-year. Key areas experiencing growth include cloud security architecture, zero-trust implementation, and AI-driven threat detection. Companies are investing heavily in security operations centers (SOCs) and incident response teams. The report highlights critical skill gaps in areas like quantum cryptography, blockchain security, and IoT device protection. Certification programs for CISSP, CEH, and CISM are seeing 200% enrollment increases.",
      time: "6 hours ago",
      category: "Security",
      trending: true,
    },
    {
      id: 4,
      title: "Google Launches New Cloud AI Services for Startups",
      summary: "Comprehensive AI toolkit now available for emerging tech companies at reduced costs.",
      detailedContent:
        "Google Cloud's new AI startup program offers $100,000 in credits and access to advanced machine learning tools including Vertex AI, AutoML, and custom TPU instances. The program targets early-stage companies working on innovative AI solutions, providing mentorship from Google engineers and priority support. Key features include pre-trained models for natural language processing, computer vision, and recommendation systems. Startups can now access enterprise-grade infrastructure at 70% reduced costs for the first two years. The initiative has already attracted over 500 applications, with focus areas including healthcare AI, fintech automation, and sustainable technology solutions. This is expected to accelerate AI adoption in smaller companies and create new job opportunities in AI consulting and implementation.",
      time: "8 hours ago",
      category: "Cloud",
      trending: false,
    },
  ]

  const trendingFields = [
    { field: "Artificial Intelligence", growth: "+45%", jobs: 1250, icon: "🤖" },
    { field: "Cybersecurity", growth: "+38%", jobs: 890, icon: "🔒" },
    { field: "Cloud Computing", growth: "+32%", jobs: 1100, icon: "☁️" },
    { field: "Data Science", growth: "+28%", jobs: 950, icon: "📊" },
    { field: "DevOps", growth: "+25%", jobs: 780, icon: "⚙️" },
    { field: "Mobile Development", growth: "+22%", jobs: 670, icon: "📱" },
  ]

  const bulletinUpdates = [
    {
      time: "10:30 AM",
      update: "New batch of AI/ML internships added - 50+ positions available",
      type: "opportunity",
    },
    {
      time: "09:15 AM",
      update: "Tech salary report 2024: Average increase of 15% across all roles",
      type: "news",
    },
    {
      time: "08:45 AM",
      update: "Upcoming virtual job fair on Feb 15th - Register now!",
      type: "event",
    },
    {
      time: "Yesterday",
      update: "Partnership with 25+ new startups for exclusive internship programs",
      type: "announcement",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Information About Internswallah</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest tech news, trending job opportunities, and industry insights. Your gateway to
            the most current information in the technology sector.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab("news")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "news" ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Tech News
            </button>
            <button
              onClick={() => setActiveTab("trends")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "trends" ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Trending Fields
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "news" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Clock className="mr-2 h-6 w-6 text-blue-600" />
                  Latest Tech News (Last 24 Hours)
                </h2>
                {techNews.map((news) => {
                  const isExpanded = expandedCards.has(news.id)
                  return (
                    <div
                      key={news.id}
                      className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  news.trending ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {news.category}
                              </span>
                              {news.trending && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Trending
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{news.title}</h3>
                            <p className="text-gray-600">{news.summary}</p>
                            {isExpanded && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-700 leading-relaxed">{news.detailedContent}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {news.time}
                          </span>
                          <button
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            onClick={() => {
                              const newExpandedCards = new Set(expandedCards)
                              if (isExpanded) {
                                newExpandedCards.delete(news.id)
                              } else {
                                newExpandedCards.add(news.id)
                              }
                              setExpandedCards(newExpandedCards)
                            }}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            {isExpanded ? "Show Less" : "Read More"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {activeTab === "trends" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="mr-2 h-6 w-6 text-blue-600" />
                  Trending Tech Fields
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trendingFields.map((field, index) => (
                    <div key={index} className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{field.icon}</span>
                            <h3 className="text-lg font-semibold">{field.field}</h3>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {field.growth}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Available positions</span>
                          <span className="text-xl font-bold text-blue-600">{field.jobs}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* News Bulletin */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  Live Updates
                </h3>
              </div>
              <div className="px-6 pb-6">
                <div className="space-y-4">
                  {bulletinUpdates.map((update, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-blue-600">{update.time}</span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                            update.type === "opportunity"
                              ? "border-green-500 text-green-700"
                              : update.type === "event"
                                ? "border-purple-500 text-purple-700"
                                : "border-blue-500 text-blue-700"
                          }`}
                        >
                          {update.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{update.update}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">Platform Statistics</h3>
              </div>
              <div className="px-6 pb-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Internships</span>
                    <span className="font-bold text-blue-600">2,450+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Job Openings</span>
                    <span className="font-bold text-green-600">1,890+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Companies</span>
                    <span className="font-bold text-purple-600">850+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Success Stories</span>
                    <span className="font-bold text-orange-600">15,000+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
