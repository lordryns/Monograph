import { useState } from "react";
import {addToast, Button} from "@heroui/react";
import { databases, databaseId, bookCollectionId } from "@/appwrite_client/init_client.ts"

export default function BookCard(props: any) {
  const [isPressed, setIsPressed] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleClick = (_: React.MouseEvent) => {
    // Create ripple effect
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
  };

  const downloadClick = () => {
    databases.getDocument(
    databaseId,
    bookCollectionId, 
    props.id
).then(res => res.downloads)
      .then(count => {
        databases.updateDocument(
          databaseId,
          bookCollectionId, 
          props.id,
          {"downloads": count + 1}
        );
      })
      .catch(err => console.log(err));
  
      addToast({
            title: "Downloading...",
            description: `Downloading ${props.title}...`,
            timeout: 4000,
            shouldShowTimeoutProgress: true,
            color: "success"
          });
    window.open(props.download_link);
  };

  return (
    <div 
      className="relative bg-white rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col cursor-pointer border border-gray-200/60"
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        transform: isPressed ? 'scale(0.97)' : 'scale(1)',
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)"
      }}
    >
      {/* Ripple effect */}
      {ripple && (
        <span className="absolute inset-0 bg-black opacity-0 animate-ripple rounded-2xl" />
      )}

      {/* Book Cover with Apple-style shadow */}
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-2xl flex items-center justify-center p-4">
        <img 
          src={props.cover} 
          alt={props.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 rounded-xl shadow-sm"
          style={{
            boxShadow: "0 2px 30px rgba(0, 0, 0, 0.08)"
          }}
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="font-semibold text-gray-900 text-base leading-tight tracking-tight line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {props.title}
        </h3>
        <p className="text-gray-500 text-sm tracking-tight line-clamp-1 mb-4 font-light">
          {props.author}
        </p>
        
        {/* Apple-style Black Button */}
        <button 
          className="relative overflow-hidden w-full bg-gray-900 text-white text-sm font-medium py-3.5 rounded-xl transition-all duration-300 text-center hover:bg-gray-800 active:bg-gray-950 active:scale-95"
          onClick={
            (e) => {
            e.stopPropagation(); downloadClick();} }
          style={{
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
          }}>
          <span className="relative z-10">Get</span>
          
          {/* Subtle hover effect */}
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
        </button>
      </div>

      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
