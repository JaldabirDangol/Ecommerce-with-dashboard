import { prisma } from "@/lib/db"


const reviewFetcher = async(id:string)=>{
   const productReviews = await prisma.product.findUnique({
  where: { id},
  include: {
    reviews: {
      include: {
        user: true,
      },
    },
  },
});

return productReviews;
}


const ReviewSection = async({id}:{id:string}) => {
  const product = await reviewFetcher(id);
  
  if (!product || !product.reviews) {
    return <div>No reviews found.</div>;
  }

  const reviews = product.reviews;

  return (
    <div className="w-full flex flex-col">
 <div className="w-full flex flex-col p-4 bg-white rounded-lg shadow-sm border border-gray-200">
  <div className="mb-4 text-center">
    <h2 className="text-xl font-semibold text-gray-800">
      Ratings & Customer Reviews
    </h2>
    <p className="flex items-center justify-center text-gray-700 text-sm">
      <span className="text-yellow-400 text-lg mr-1">★</span>
      <span className="font-medium">4.2</span>
      <span className="text-gray-500 ml-1">out of 5 stars</span>
    </p>
    <p className="text-gray-500 text-sm">3,444 global ratings</p>
  </div>

  <div className="space-y-2">
    {[5, 4, 3, 2, 1].map((rating) => (
      <div
        key={rating}
        className="flex items-center w-full gap-2 hover:cursor-pointer"
      >
        <div className="flex">
          {Array.from({ length: rating }).map((_, i) => (
            <div key={`filled-${rating}-${i}`} className="text-yellow-400">
              ★
            </div>
          ))}
          {Array.from({ length: 5 - rating }).map((_, i) => (
            <div key={`empty-${rating}-${i}`} className="text-gray-300">
              ★
            </div>
          ))}
        </div>

        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-yellow-400 h-full"
            style={{ width: `${rating * 20}%` }}
          ></div>
        </div>

        <span className="text-sm text-gray-600 whitespace-nowrap">
          {rating} star
        </span>
      </div>
    ))}
  </div>
</div>


<div className="w-full flex flex-col p-4 ">
        {
          reviews &&  reviews.map((review)=>(
                <div key={review.id} className="w-full flex flex-col">
                <p>{review.descriptions}</p> 
                </div>
            ))
        }
</div>
           
        </div>
  )
}

export default ReviewSection