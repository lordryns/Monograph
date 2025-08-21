export default function BookCard(props) {
  return (
    <div className="bg-white rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
      <div className="h-72 overflow-hidden bg-gray-50 rounded-t-lg">
        <img 
          src={props.cover} 
          alt={props.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-lg mb-1 line-clamp-1">{props.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{props.author}</p>
        <a 
          href={props.download_link} 
          className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg text-sm transition-colors font-medium"
        >
          Download
        </a>
      </div>
    </div>
  );
}
