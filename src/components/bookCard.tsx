export default function BookCard(props: any) {
  return (
    <div className="bg-white rounded-lg overflow-hidden group transition-all duration-300 flex flex-col">
      {/* Book Cover */}
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-3 flex items-center justify-center">
        <img 
          src={props.cover} 
          alt={props.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow px-1">
        <h3 className="font-medium text-gray-900 text-xs leading-tight tracking-tight line-clamp-2 mb-1">
          {props.title}
        </h3>
        <p className="text-gray-500 text-xs tracking-tight line-clamp-1 mb-3">
          {props.author}
        </p>
        
        {/* Apple-style download button */}
        <a 
          href={props.download_link} 
          className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 text-xs font-medium py-2 rounded-md transition-all duration-200 text-center"
        >
          Download
        </a>
      </div>
    </div>
  );
}
