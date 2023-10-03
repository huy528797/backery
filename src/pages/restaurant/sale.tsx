import React from "react";
import { Box, Icon, Text } from "zmp-ui";
import Time from "../../components/format/time";
import Day from "../../components/format/day";
import { Restaurant } from "../../models";
import { openPhone } from "zmp-sdk";
import {zmp} from "zmp-framework/react";
const { Title } = Text;
function Information({ restaurant }: { restaurant: Restaurant }) {
const data = [
  {
    productName: "Xoai",
    price: 5000,
    quantity: 20
  },
  {
    productName: "Tao",
    price: 5000,
    quantity: 40
  }
]
async function thanhtoan(danhsachsanpham){
  const response = await fetch("http://124.158.5.222:8000/VnetManager/api.jsp?node=thanhtoan&chart=TaiNguyen_zalo" )
  // console.log(await response.text())
  // alert(await response.text())
  // {
  //   method: "GET", // or 'PUT'S
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   // body: JSON.stringify(danhsachsanpham),
  // });
  let dlg;
  dlg = zmp.dialog.create({
    title: "Popup Title",
    closeByBackdropClick: true,
    destroyOnClose: true,
    content:
      "The content of the pop-up window informs you of the current status, information and solutions",
    on: {
      closed() {
        dlg = null;
      },
    },
    buttons: [
      {
        text: "Negative Action",
        cssClass: "dialog-negative-action",
        close: true,
      },
      {
        text: "Main Action",
        close: false,
        onClick() {
          console.log("main actions");
        },
      },
    ],
  });
  dlg.open();
}

  return (
    <Box mx={2}>
      <Box mx={2} mt={5}>
        <Title className="font-semibold mb-2" size="small">
          Thông tin
        </Title>
        {
          data.map(number => <Text>ten san pham: {number.productName}, gia: {number.price}, so luong: {number.quantity}, thanh tien: {(number.price*number.quantity).toLocaleString()}</Text>)
        }
        <button onClick= {() => thanhtoan({data})}>
          dong y
        </button>
      </Box>
      <Box mx={2} mt={6}>
        <Title className="font-semibold mb-2" size="small">
          Giờ mở cửa
        </Title>
        <Box flex mx={0} alignItems="center" justifyContent="space-between">
          <span>
            <Icon icon="zi-clock-1" className="text-green-500 mr-1" />
            <Time time={restaurant.hours.opening} /> -{" "}
            <Time time={restaurant.hours.closing} />
          </span>
          <span>
            <Icon icon="zi-calendar" className="text-secondary mr-1" />
            <Day day={restaurant.days.opening} /> -{" "}
            <Day day={restaurant.days.closing} />
          </span>
        </Box>
      </Box>
      <Box mx={2} mt={6}>
        <Title className="font-semibold mb-2" size="small">
          Hotline liên hệ
        </Title>
        <Box flex mx={0} alignItems="center" justifyContent="space-between">
          <a onClick={() => openPhone({ phoneNumber: restaurant.hotline })}>
            <Icon icon="zi-call" className="text-green-500 mr-1" />
            <span className="text-primary">{restaurant.hotline}</span>
          </a>
        </Box>
      </Box>
      <Box mx={2} mt={6}>
        <Title className="font-semibold mb-2" size="small">
          Địa chỉ
        </Title>
        <Box
          flex
          mx={0}
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <span>
            <Icon icon="zi-location-solid" className="text-red-500 mr-1" />
            {restaurant.address}
          </span>
        </Box>
        <iframe
          className="w-full aspect-cinema rounded-xl border-none"
          src={restaurant.map}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </Box>
  );
      }

export default Information;
