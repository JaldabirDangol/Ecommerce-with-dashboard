import { prisma } from "@/lib/db";
import { Review, User } from "@prisma/client";
import { auth } from "@/lib/auth";
import ReviewForm from "./ReviewForm";

// Type definition for a review including the user's name
type ReviewWithUser = Review & {
  user: Pick<User, "name" | "id">;
};

const reviewFetcher = async (id: string) => {
  const productReviews = await prisma.product.findUnique({
    where: { id },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return productReviews;
};

const ReviewSection = async ({ id }: { id: string }) => {
  const product = await reviewFetcher(id);
  const session = await auth();
  const userId = session?.user?.id;

  if (!product || !product.reviews) {
    return (
      <div className="w-full flex flex-col p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Customer Reviews
        </h2>
        <div className="mt-4 text-center text-gray-500">
          No reviews found for this product.
        </div>
      </div>
    );
  }

  const reviews = product.reviews as ReviewWithUser[];
  const totalRatings = reviews.length;
  const averageRating =
    totalRatings > 0
      ? (
          reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
          totalRatings
        ).toFixed(1)
      : "0";

  const starCounts = reviews.reduce((acc, review) => {
    if (review.rating) {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Ratings & Customer Reviews Summary Section */}
      <div className="w-full flex flex-col p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Ratings & Customer Reviews
          </h2>
          <p className="flex items-center justify-center text-gray-700 text-sm">
            <span className="text-yellow-400 text-lg mr-1">★</span>
            <span className="font-medium">{averageRating}</span>
            <span className="text-gray-500 ml-1">out of 5 stars</span>
          </p>
          <p className="text-gray-500 text-sm">{totalRatings} global ratings</p>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = starCounts[rating] || 0;
            const percentage =
              totalRatings > 0 ? (count / totalRatings) * 100 : 0;
            return (
              <div
                key={rating}
                className="flex items-center w-full gap-2 hover:cursor-pointer"
              >
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {rating} star
                </span>
                <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Review Form Section (Conditionally Rendered) */}
      {userId ? (
        <ReviewForm productId={id} />
      ) : (
        <div className="w-full text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600">
            Please log in to leave a review.
          </p>
        </div>
      )}

      {/* Individual Reviews Section */}
      <div className="w-full flex flex-col p-4 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Top Reviews
        </h3>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="w-full flex flex-col p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-1 mb-2 text-yellow-400">
              {Array.from({ length: review.rating || 0 }).map((_, i) => (
                <span key={`filled-${review.id}-${i}`}>★</span>
              ))}
              {Array.from({ length: 5 - (review.rating || 0) }).map((_, i) => (
                <span key={`empty-${review.id}-${i}`} className="text-gray-300">
                  ★
                </span>
              ))}
            </div>
            <p className="font-semibold text-gray-800">
              {review.user.name || "Anonymous"}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Reviewed on {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{review.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;