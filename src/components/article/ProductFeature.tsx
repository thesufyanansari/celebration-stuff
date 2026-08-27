import { ArticleProductCard, type EnhancedProduct } from "./ArticleProductCard";

export interface ProductFeatureProps {
  product: EnhancedProduct;
  index: number;
  narrativeParagraphs?: string[] | undefined;
}

export function ProductFeature({ product, index, narrativeParagraphs }: ProductFeatureProps) {
  return (
    <ArticleProductCard
      product={product}
      index={index}
      narrativeParagraphs={narrativeParagraphs}
      showPickNumber={true}
    />
  );
}
