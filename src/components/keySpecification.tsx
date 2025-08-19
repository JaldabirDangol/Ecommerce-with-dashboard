import React from 'react';
import { StarIcon as StarIconSolid } from '@heroicons/react/20/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { CheckBadgeIcon, XCircleIcon } from '@heroicons/react/24/solid';

const KeySpecification = ({ product }: any) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <StarIconSolid key={`full-${i}`} className="h-4 w-4" />
        ))}
        {hasHalfStar && <StarIconSolid className="h-4 w-4 transform scale-x-[-1] text-gray-300" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIconOutline key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="lg:flex flex-col w-full max-w-[300px] hidden  bg-gray-50 rounded-2xl p-6 gap-4 shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-2 border-gray-200">
        Key Specifications
      </h2>

      <div className="grid gap-y-3 text-sm text-gray-700">
        <div className="grid grid-cols-2 gap-x-4">
          <strong className="font-semibold text-gray-800">Brand:</strong>
          <span>{product.brand}</span>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <strong className="font-semibold text-gray-800">Model:</strong>
          <span>{product.name.split('"')[0].trim()}</span>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <strong className="font-semibold text-gray-800">Category:</strong>
          <span>{product.categoryId}</span>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <strong className="font-semibold text-gray-800 flex items-center gap-1">
            Availability:
          </strong>
          <span
            className={`flex items-center gap-1 font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? (
              <CheckBadgeIcon className="h-5 w-5" />
            ) : (
              <XCircleIcon className="h-5 w-5" />
            )}
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <strong className="font-semibold text-gray-800">Warranty:</strong>
          <span>{product.warrenty}</span>
        </div>

        {product.reviewsCount > 0 && (
          <div className="grid grid-cols-2 gap-x-4">
            <strong className="font-semibold text-gray-800">Rating:</strong>
            <div className="flex items-center gap-1">
              {renderStars(product.averageRating)}
              <span className="text-xs text-gray-500">
                ({product.averageRating.toFixed(1)}/5, {product.reviewsCount} reviews)
              </span>
            </div>
          </div>
        )}

        {product.weight && (
          <div className="grid grid-cols-2 gap-x-4">
            <strong className="font-semibold text-gray-800">Weight:</strong>
            <span>{product.weight}</span>
          </div>
        )}

        {product.dimensions && (
          <div className="grid grid-cols-2 gap-x-4">
            <strong className="font-semibold text-gray-800">Dimensions:</strong>
            <span>{product.dimensions}</span>
          </div>
        )}

        {product.material && (
          <div className="grid grid-cols-2 gap-x-4">
            <strong className="font-semibold text-gray-800">Material:</strong>
            <span>{product.material}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeySpecification;