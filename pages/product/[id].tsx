import React, { useEffect, useState } from "react";
import Image from "next/image";
import Onboarding from "@/layout/index";
import { useRouter } from "next/router";
import { Box, Button, Stack, Typography } from "@mui/material";
import Styles from "@/styles/details.module.scss";
import { _products } from "@/mocks";
import AddToCart from "@/components/elements/addToCart";
import CartUpdateQuantity from "@/components/elements/cartUpdateQuantity";
import Products from "@/components/products";
import stringToCurrency from "@/utils/currency";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const { asPath } = useRouter();
  const id = +asPath.split("/").slice(-1)[0];

  const product = _products.find((product) => product.id === id);

  const handleClickThumbnail = (img: string) => {
    setSelectedImage(img);
  };

  useEffect(() => {
    if (id) {
      setSelectedImage(product?.images[0]);
    }
  }, [id]);

  return (
    <Onboarding title={product?.name} maxWidth={"100% !important"}>
      <Box className={Styles.container}>
        <Stack direction="row" spacing="45px">
          {/* thumbnail */}
          <Stack>
            <Box className={Styles.thumbnail}>
              {selectedImage && (
                <Image
                  src={require(`@/public/images${selectedImage}.png`)}
                  alt={"product?.name"}
                  height={670}
                />
              )}
            </Box>
            <Stack
              direction="row"
              className={Styles.thumbnailContainer}
              gap="26px"
              mt="16px"
            >
              {product?.images.slice(1).map((image, index) => (
                <Image
                  key={index}
                  src={require(`@/public/images${image}.png`)}
                  alt={`Thumbnail ${index}`}
                  className={Styles.thumbnailImage}
                  onClick={() => handleClickThumbnail(image)}
                  width={194}
                  height={189}
                />
              ))}
            </Stack>
          </Stack>
          {/* details -> title, amount */}
          <Box pt="18px" maxWidth="575px">
            {/* title */}
            <Typography variant="h1">{product?.name}</Typography>
            {/* amount */}
            <Typography variant="h2" mt="26px">
              N{stringToCurrency(product?.amount ?? 0)}
            </Typography>
            {/* description */}
            <Typography
              mt="26px"
              color="#9E9E9E"
              fontSize="21px"
              lineHeight="160%"
            >
              {product?.description}
            </Typography>
            {/* choose flavor btn */}
            <Button variant="outlined" sx={{ mt: "37px" }}>
              Choose a flavour &gt;
            </Button>
            <Stack direction="row" gap="81px" mt="74px">
              {product && (
                <>
                  <AddToCart {...product} height={52} width={190} />
                  <CartUpdateQuantity {...product} />
                </>
              )}
            </Stack>
          </Box>
        </Stack>
        {/* related products */}
      </Box>
      <Stack className={Styles.relatedProdContainer}>
        <Typography variant="h2">Related Products</Typography>
        <Products limit={4} />
      </Stack>
    </Onboarding>
  );
}
