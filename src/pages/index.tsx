import { useState, useEffect } from "react";

import { databases, databaseId, bookCollectionId } from "@/appwrite_client/init_client.ts"

import BookCard from "@/components/bookCard.tsx";
import { Alert } from "@heroui/react";
interface Book {
  id: string;
  key: number,
  title: string,
  author: string, 
  cover: string, 
  url: string,
  tags: string[]
}

export default function IndexPage() {
 const [alertIsVisible, setAlertIsVisible] = useState(false);

  const [allBooks, setAllBooks] = useState<Book[]>([]);
 const [preSearchBooks, updatePreSearchBooks] = useState<Book[]>([]);
 const [books, updateBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    databases.listDocuments(databaseId, bookCollectionId)
      .then(res => res.documents)
      .then(res => {
        const mappedBook = res.map((item, index) => {
            return {id: item.$id, key: index, title: item.title, author: item.author, cover: item.cover, url: item.url, tags: item.tags}
        })


          updateBooks(mappedBook.slice().reverse());
          setAllBooks(mappedBook.slice().reverse());
      })
      .catch(err => console.log(err));

  }, [])



  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  //const [sortBy, setSortBy] = useState("Most Recent");
  
    // Categories
  const categories = ["All", "Political", "Fiction", "Biography", "History", "Technology", "Philosophy"];


  useEffect(() => {

    if (searchQuery.length < 1) {
      updateBooks(preSearchBooks);
    } else {
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase()));
    updateBooks(filteredBooks);
    }

    if (preSearchBooks.length === 0) {
      updatePreSearchBooks(books);
    }
  }, [searchQuery])

  useEffect(() => {
    if (selectedCategory === "All") {
      updateBooks(allBooks);
    } else {

      const filteredBooks = allBooks.filter(book => Array.isArray(book.tags) && book.tags.some(tag => tag.charAt(0).toUpperCase() + tag.slice(1) === selectedCategory))
      updateBooks(filteredBooks);
    }

  }, [selectedCategory])
  return (
    <div className="min-h-screen bg-white">
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
          
                </div>


        <Alert
          color="success"
          description="Book is being downloaded!"
          isVisible={ alertIsVisible }
          title="Downloading book..."
          variant="faded"
          onClose={() => {setAlertIsVisible(false)}}
        />


                  {/* Results count */}
        <div className="mb-8 flex justify-between items-center">
          <h3 className="text-lg font-regular text-gray-800">
            {selectedCategory === "All" ? "All Books" : selectedCategory}
          </h3>
        </div>

        {/* Books Grid */}
<section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {
            books.length < 1 ? "Nothing to see here..." :
            books.map(book => (
            <BookCard
              id={book.id}
              key={book.key} 
              title={book.title}
              cover={book.cover}
              author={book.author}
              download_link={book.url}
              triggerAtDownload = {() => {
                    setAlertIsVisible(true);
                  }}
            />
          )
            )
          }
        </section>
      </main>

      {/* Footer - Apple style minimalism */}
      <footer className="bg-gray-50 mt-20 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>Want to contribute? Find me on <a href="https://github.com/lordryns" target="_blank">Github</a> or <a href="https://x.com/lordryns" target="_blank">X (twitter)</a> @lordryns.</p>
        </div>
      </footer>
    </div>
  );}
