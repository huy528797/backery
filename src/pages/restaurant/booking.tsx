import React, { useState } from "react";
import { Box, Button, Text } from "zmp-ui";
import DateBooker from "../../components/book/date-booker";
import TableBooker from "../../components/book/table-booker";
import SeatsPicker from "../../components/book/seats-booker";
import TimeBooker from "../../components/book/time-booker";
import Price from "../../components/format/price";
import { pay } from "../../services/zalo";
import { message } from "../../utils/notification";
import { getConfig } from "../../components/config-provider";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookingsState, cartState, totalState } from "../../state";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../models";
import TypeTableBooker from "../../components/book/typetable-booker";

const { Title } = Text;

function Booking({ restaurant }: { restaurant: Restaurant }) {
  const [seats, setSeats] = useState(4);
  const [hour, setHour] = useState(restaurant.hours.opening);
  const [date, setDate] = useState(new Date());
  const [table, setTable] = useState("05");
  const [tableType, setTableType] = useState("normal");
  const setBookings = useSetRecoilState(bookingsState);
  const total = useRecoilValue(totalState);
  const navigate = useNavigate();
  const cart = useRecoilValue(cartState);
  // interface InnerModel {
  //   alo: "aaa";
  // }
  // const sos = async (InnerModel) => {
  //   const url = `http://124.158.5.222:8000/VnetManager/api.jsp?node=testAPI&chart=TaiNguyen_zalo&type=${InnerModel}`;
  //   await fetch(url);
  // }

  const book = async (type) => {
    // Tính toán tổng tiền đặt bàn
    const serviceFee = getConfig((c) => c.template.serviceFee);
    let tableFee = 0;
    if (tableType === "normal") {
      tableFee = 50000;
    } else if (tableType === "party") {
      tableFee = 200000;
    }
    const totalAmount = tableFee;

    // Thực hiện thanh toán
    await pay(totalAmount);

    // Lưu thông tin đặt bàn vào danh sách đặt bàn
    const bookingInfo = {
      seats,
      hour,
      date,
      table,
      tableType,
    };

    setBookings((bookings) => [
      ...bookings,
      {
        restaurant,
        id: +new Date() + "",
        cart,
        bookingInfo,
      },
    ]);

    // Hiển thị thông báo thành công và chuyển hướng người dùng
    message("Đặt bàn thành công");

    if (type === "bookAndOrder") {
      console.log("aaaaa")
      // Chuyển hướng đến trang thực đơn để đặt món ăn
      navigate("/ ");
     console.log(navigate)
    } else if (type === "book") {
      // Chuyển hướng đến trang lịch để xem thông tin đặt bàn
      navigate("/calendar");
      console.log(navigate)
    }
  };

  return (
    <>
      <Box mx={4} my={6}>
        <DateBooker onChange={setDate} />
        <Box flex justifyContent="space-between" my={6}>
          <TableBooker value={table} onChange={setTable} />
          <SeatsPicker value={seats} onChange={setSeats} />
        </Box>
        <TypeTableBooker selectedType={tableType} onChange={setTableType} />
        <TimeBooker hours={restaurant.hours} onChange={setHour} />
      </Box>
      <Box
        m={0}
        p={6}
        className="bg-white fixed bottom-0 left-0 right-0 shadow z-10 border"
      >
        <Box mb={4} flex justifyContent="space-between">
          <Title size="small">Phí dịch vụ đặt bàn</Title>
          <Text className="ml-6 text-secondary sfont-semibold" size="xLarge">
            Bàn thường: 50.000đ
          </Text>
          <Text className="ml-6 text-secondary sfont-semibold" size="xLarge">
            Bàn tiệc: 200.000đ
          </Text>
        </Box>
        <Button fullWidth onClick={() => book("bookAndOrder")}>
          Đặt bàn và món ăn
        </Button>
        <Button
          onClick={() => book("book")}
          size="large"
          fullWidth
          className="rounded-xl"
          variant="secondary"
        >
          Chỉ đặt bàn
        </Button>
      </Box>
    </>
  );
}

export default Booking;
