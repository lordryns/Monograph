import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Divider,
  Link
} from "@heroui/react";

import { databases, databaseId, bookCollectionId } from "@/appwrite_client/init_client.ts"

export default function IndexPage() {
  databases.listDocuments(databaseId, bookCollectionId)
    .then(res => console.log(res.documents))
    .catch(err => console.log(err));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Most Recent");
  
  // Sample book data
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      dateAdded: "2023-10-15",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Dune",
      author: "Frank Herbert",
      category: "Sci-Fi",
      dateAdded: "2023-10-10",
      coverImage: "https://images.unsplash.com/photo-1558901357-ca41e027e43a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Fiction",
      dateAdded: "2023-10-05",
      coverImage: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      category: "Dystopian",
      dateAdded: "2023-09-28",
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "The Art of War",
      author: "Sun Tzu",
      category: "Philosophy",
      dateAdded: "2023-09-20",
      coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      category: "History",
      dateAdded: "2023-09-15",
      coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Categories
  const categories = ["All", "Political", "Science Fiction", "Mystery", "Biography", "History", "Technology", "Philosophy"];
  
  // Sort options
  const sortOptions = ["Most Recent", "Oldest", "A-Z", "Z-A"];

  // Filter books by category
  const filteredBooks = selectedCategory === "All" 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  // Sort books based on selection
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch(sortBy) {
      case "Most Recent":
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case "Oldest":
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      case "A-Z":
        return a.title.localeCompare(b.title);
      case "Z-A":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Apple style */}
      <header className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-light text-gray-900 tracking-tight">
            Monograph
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-48 md:w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Categories and Sort Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-4">Browse</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8 flex justify-between items-center">
          <h3 className="text-lg font-regular text-gray-800">
            {selectedCategory === "All" ? "All Books" : selectedCategory}
          </h3>
          <p className="text-sm text-gray-500">{sortedBooks.length} books</p>
        </div>

        {/* Books Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sortedBooks.map(book => (
            <div key={book.id} className="bg-white rounded-lg overflow-hidden group">
              <div className="h-72 overflow-hidden bg-gray-50 rounded-lg mb-4">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-1">
                <h3 className="font-medium text-gray-900 text-lg mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{book.author}</p>
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg text-sm transition-colors font-regular">
                  Download
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer - Apple style minimalism */}
      <footer className="bg-gray-50 mt-20 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2023 Monograph. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );}
