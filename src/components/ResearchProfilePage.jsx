// File: src/components/ResearchProfilePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function ResearchProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("articles");
  const [sortOrder, setSortOrder] = useState("citations");
  const [yearRange, setYearRange] = useState("all");
  
  // Hardcoded profile data
  const profileData = {
    name: "Dr. Jane Smith",
    affiliation: "Stanford University, Department of Computer Science",
    interests: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Human-Computer Interaction"],
    stats: {
      citations: 8437,
      hIndex: 42,
      i10Index: 98
    },
    coauthors: [
      { name: "John Doe", affiliation: "MIT", imgSrc: "/api/placeholder/30/30" },
      { name: "Alice Johnson", affiliation: "Google Research", imgSrc: "/api/placeholder/30/30" },
      { name: "Robert Chen", affiliation: "Stanford University", imgSrc: "/api/placeholder/30/30" },
      { name: "Maria Garcia", affiliation: "UC Berkeley", imgSrc: "/api/placeholder/30/30" },
      { name: "James Wilson", affiliation: "DeepMind", imgSrc: "/api/placeholder/30/30" }
    ]
  };

  // Hardcoded publications data
  const publications = [
    {
      title: "Attention Is All You Need",
      authors: "Jane Smith, John Doe, Alice Johnson",
      journal: "Advances in Neural Information Processing Systems",
      year: 2023,
      citations: 54236,
      isStarred: true
    },
    {
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Jane Smith, Robert Chen, Maria Garcia",
      journal: "NAACL",
      year: 2022,
      citations: 35918,
      isStarred: true
    },
    {
      title: "Deep Residual Learning for Image Recognition",
      authors: "Jane Smith, James Wilson",
      journal: "IEEE Conference on Computer Vision and Pattern Recognition",
      year: 2021,
      citations: 28733,
      isStarred: false
    },
    {
      title: "GPT-3: Language Models are Few-Shot Learners",
      authors: "Jane Smith, Alice Johnson, James Wilson",
      journal: "Advances in Neural Information Processing Systems",
      year: 2020,
      citations: 12437,
      isStarred: true
    },
    {
      title: "Distributed Representations of Words and Phrases and their Compositionality",
      authors: "Jane Smith, John Doe",
      journal: "Advances in Neural Information Processing Systems",
      year: 2019,
      citations: 19743,
      isStarred: false
    },
    {
      title: "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift",
      authors: "Jane Smith, Maria Garcia",
      journal: "International Conference on Machine Learning",
      year: 2018,
      citations: 14352,
      isStarred: false
    },
    {
      title: "Generative Adversarial Networks",
      authors: "Jane Smith, Robert Chen",
      journal: "Advances in Neural Information Processing Systems",
      year: 2017,
      citations: 29651,
      isStarred: true
    }
  ];

  // Sort publications based on selected order
  const sortedPublications = [...publications].sort((a, b) => {
    if (sortOrder === "citations") {
      return b.citations - a.citations;
    } else if (sortOrder === "year") {
      return b.year - a.year;
    } else if (sortOrder === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Filter publications by year range
  const filteredPublications = sortedPublications.filter(pub => {
    if (yearRange === "all") return true;
    if (yearRange === "since2020") return pub.year >= 2020;
    if (yearRange === "since2018") return pub.year >= 2018;
    if (yearRange === "custom") {
      // For a custom range implementation, we would add date pickers
      return true;
    }
    return true;
  });

  // Citation data for charts (by year)
  const citationsByYear = [
    { year: 2017, citations: 750 },
    { year: 2018, citations: 1230 },
    { year: 2019, citations: 1850 },
    { year: 2020, citations: 1480 },
    { year: 2021, citations: 1620 },
    { year: 2022, citations: 1120 },
    { year: 2023, citations: 387 }
  ];

  const handleBackToHome = () => {
    navigate("/dashboard/chats"); // Navigate back to chats component
  };

  const toggleStar = (index) => {
    // In a real app, you would update the database here
    // For this demo, we'll just show what would happen
    alert(`Publication "${publications[index].title}" ${publications[index].isStarred ? "un-starred" : "starred"}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full p-6 overflow-y-auto bg-gray-900">
          {/* Back Button */}
          <button 
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6 text-sm"
            onClick={handleBackToHome}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>

          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center text-5xl font-bold">
                JS
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-indigo-300 mb-2">{profileData.name}</h1>
              <p className="text-gray-400 mb-3">{profileData.affiliation}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.interests.map((interest, idx) => (
                  <span key={idx} className="bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium">
                    {interest}
                  </span>
                ))}
              </div>

              {/* Citation Metrics */}
              <div className="bg-gray-800 rounded-lg p-4 shadow-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-indigo-300">{profileData.stats.citations}</h3>
                    <p className="text-sm text-gray-400">Citations</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-indigo-300">{profileData.stats.hIndex}</h3>
                    <p className="text-sm text-gray-400">h-index</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-indigo-300">{profileData.stats.i10Index}</h3>
                    <p className="text-sm text-gray-400">i10-index</p>
                  </div>
                </div>
              </div>

              {/* Citation Graph (simplified) */}
              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-sm font-semibold text-indigo-300 mb-2">Citations per Year</h3>
                <div className="h-20 w-full flex items-end justify-between gap-1">
                  {citationsByYear.map((data, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-indigo-600 hover:bg-indigo-500 transition-colors"
                        style={{ height: `${(data.citations / 2000) * 100}%`, minHeight: '4px' }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-1">{data.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-indigo-900 mb-6">
            <div className="flex space-x-4">
              <button
                className={`pb-2 px-1 text-sm font-medium ${activeTab === "articles" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400 hover:text-gray-300"}`}
                onClick={() => setActiveTab("articles")}
              >
                Articles
              </button>
              <button
                className={`pb-2 px-1 text-sm font-medium ${activeTab === "coauthors" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400 hover:text-gray-300"}`}
                onClick={() => setActiveTab("coauthors")}
              >
                Co-authors
              </button>
            </div>
          </div>

          {/* Articles Tab Content */}
          {activeTab === "articles" && (
            <>
              {/* Filters */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <label className="text-gray-400 text-sm">Sort by:</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-gray-800 text-white border border-indigo-900 rounded py-1 px-2 text-sm focus:outline-none focus:border-indigo-600"
                  >
                    <option value="citations">Citations</option>
                    <option value="year">Year (newest)</option>
                    <option value="title">Title</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-gray-400 text-sm">Year range:</label>
                  <select
                    value={yearRange}
                    onChange={(e) => setYearRange(e.target.value)}
                    className="bg-gray-800 text-white border border-indigo-900 rounded py-1 px-2 text-sm focus:outline-none focus:border-indigo-600"
                  >
                    <option value="all">All</option>
                    <option value="since2020">Since 2020</option>
                    <option value="since2018">Since 2018</option>
                    <option value="custom">Custom range</option>
                  </select>
                </div>
              </div>

              {/* Publications List */}
              <div className="space-y-6">
                {filteredPublications.map((pub, idx) => (
                  <div key={idx} className="bg-gray-800 rounded-lg p-4 shadow-md hover:bg-gray-750 transition-colors">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-indigo-300 font-semibold">{pub.title}</h3>
                      <button 
                        className="text-gray-400 hover:text-indigo-300"
                        onClick={() => toggleStar(idx)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={pub.isStarred ? "currentColor" : "none"} stroke="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{pub.authors}</p>
                    <p className="text-sm text-gray-500 mb-3">{pub.journal}, {pub.year}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <span className="text-indigo-400">{pub.citations} citations</span>
                      </div>
                      <button className="text-sm text-indigo-400 hover:text-indigo-300">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Co-authors Tab Content */}
          {activeTab === "coauthors" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileData.coauthors.map((author, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-4 shadow-md flex items-center gap-4 hover:bg-gray-750 transition-colors">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center overflow-hidden">
                    <img src={author.imgSrc} alt={author.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-indigo-300 font-medium">{author.name}</h3>
                    <p className="text-sm text-gray-400">{author.affiliation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}