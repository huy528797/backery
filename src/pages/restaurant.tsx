import React, { useEffect } from "react";
import { Box, Page } from "zmp-ui";
import RestaurantDetail from "./restaurant/detail";
import { useRecoilValue } from "recoil";
import { popupState } from "../state";
import Swal from "sweetalert2";

function RestaurantPage() {
  const popupResult = useRecoilValue(popupState);

  useEffect(() => {
    if (popupResult.length > 0) {
      const firstPopup = popupResult[0];
      firstPopup.then((result) => {
        if (result.isConfirmed) {

        }
      });
    }
  });
  
  return (
    <Page>
      <RestaurantDetail />
      <Box height={200}></Box>
    </Page>
  );
}

export default RestaurantPage;
