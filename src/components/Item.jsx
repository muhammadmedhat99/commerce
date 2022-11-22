import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import { addToCart, decreaseCount, increaseCount } from "../state";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const { palette: { neutral } } = useTheme();
  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        }
      }
    }
  } = image;

  return (
    <Box width={width} padding="15px" border="1px solid #f0f0f0" borderRadius="15px" boxShadow="5px 5px 15px #f0f0f0a8">
      <Box position="relative" onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
        <img src={`http://localhost:1337${url}`} alt={item.name} width="100%" height="400px" onClick={() => navigate(`/item/${item.id}`)} style={{ cursor: "pointer" }} />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" backgroundColor={shades.neutral[100]} borderRadius="3px">
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* button  */}
            <Button
              onClick={() => { dispatch(addToCart({ item: { ...item, count } })) }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category?.replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">{price}</Typography>
      </Box>
    </Box>
  )
};

export default Item;