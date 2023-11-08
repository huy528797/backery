import React from "react";
import { Box, Button, Text,Modal } from "zmp-ui";
import { useState, useRef, } from "react";
import DateBooker from "../../components/book/date-booker";
import TableBooker from "../../components/book/table-booker";
import SeatsPicker from "../../components/book/seats-booker";
import TimeBooker from "../../components/book/time-booker";
import Note from "../../components/book/note";
import Price from "../../components/format/price";
import {  } from "../../services/zalo";
import { message } from "../../utils/notification";
import { getConfig } from "../../components/config-provider";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../models";
import {
  bookingsState,
  cartState,
  currentRestaurantTabState,
  totalState,
} from "../../state";

const { Title } = Text;

function Booking({ restaurant }: { restaurant: Restaurant }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [seats, setSeats] = useState(4);
  const [hour, setHour] = useState(restaurant.hours.opening);
  const [date, setDate] = useState(new Date());
  const setBookings = useSetRecoilState(bookingsState);
  const [table, setTable] = useState("05");
  const total = useRecoilValue(totalState);
  const navigate = useNavigate();
  const cart = useRecoilValue(cartState);
  const setRestaurantTab = useSetRecoilState(currentRestaurantTabState);
  const [expaned, setExpanded] = useState(false);
  const sheetRef = useRef<any>();
  const nextStep = () => {
    sheetRef.current.snapTo(1);
    setExpanded(true);
  };
  const menu = () => {
    setRestaurantTab("menu");
  };

  const book = async () => {
    const serviceFee = getConfig((c) => c.template.serviceFee);
    await (serviceFee + total);
    setBookings((bookings) => [
      ...bookings,
      {
        restaurant,
        id: +new Date() + "",
        cart,
        bookingInfo: {
          seats,
          hour,
          date,
          table,
        },
      },
    ]);
    message("Đặt bàn thành công");
    navigate("/calendar");
  };
 

  return (
    <>
      <Box mx={4} my={6}>
      <TableBooker value={table} onChange={setTable} />
        <DateBooker onChange={setDate} />
        <Box flex justifyContent="space-between" my={6}>
          
          <SeatsPicker value={seats} onChange={setSeats} />
        </Box>
        <TimeBooker hours={restaurant.hours} onChange={setHour} />
        <Note />
      </Box>
      <Box
        m={0}
        p={6}
        className="bg-white fixed bottom-0 left-0 right-0 shadow z-10 border"
      >
        <Button className="rounded-xl"
          
          fullWidth
          onClick={() => {
            setPopupVisible(true);
          }}
        >
          Đặt bàn
        </Button>
      </Box>
      <Modal className="zaui-text text-center"
        visible={popupVisible}
        title="Thông báo"
        onClose={() => {
          setPopupVisible(false);
        }}
        // verticalActions
        description="Bạn có muốn đặt bàn không?"
      >
        <Box p={6} className="zaui-box zaui-box-mb-0 zaui-box-flex zaui-box-justify-center ">
          <Button
              onClick={menu}
              fullWidth
            >
              Thực đơn
            </Button>
          <Button
            onClick={book}
            fullWidth
          >
            Đặt bàn
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Booking;
