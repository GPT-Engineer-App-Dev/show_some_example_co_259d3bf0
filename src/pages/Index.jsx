import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Button, Text, useToast, Image, SimpleGrid } from "@chakra-ui/react";

const exampleColors = [
  { hex: "#ff0000", name: "Red" },
  { hex: "#00ff00", name: "Green" },
  { hex: "#0000ff", name: "Blue" },
  { hex: "#ffff00", name: "Yellow" },
  { hex: "#ff00ff", name: "Magenta" },
  { hex: "#00ffff", name: "Cyan" },
];

const ExampleColor = ({ hex, name, onClick }) => (
  <Box bg={hex} p={4} borderRadius="md" textAlign="center" cursor="pointer" onClick={onClick}>
    <Text fontWeight="bold">{hex}</Text>
    <Text>{name}</Text>
  </Box>
);
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [hexCode, setHexCode] = useState("");
  const [colorName, setColorName] = useState("");
  const [colorSwatch, setColorSwatch] = useState(null);
  const toast = useToast();

  const fetchColorName = async (hex) => {
    try {
      const response = await fetch(`https://api.color.pizza/v1/${hex}`);
      if (!response.ok) {
        throw new Error("Color not found");
      }
      const data = await response.json();
      if (data.colors && data.colors.length > 0) {
        setColorName(data.colors[0].name);
        setColorSwatch(data.colors[0].swatchImg.svg);
      } else {
        setColorName("Color name not found");
        setColorSwatch(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchColorName(hexCode.replace("#", ""));
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Color Name Translator
      </Text>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Color Name Translator
      </Text>
      <FormControl id="hex-color" as="form" onSubmit={handleSubmit}>
        <FormLabel>Enter HEX Color Code</FormLabel>
        <Input type="text" placeholder="e.g., #1a2b3c" value={hexCode} onChange={(e) => setHexCode(e.target.value)} />
        <Button leftIcon={<FaSearch />} mt={2} colorScheme="blue" type="submit">
          Translate Color
        </Button>
      </FormControl>
      {colorName && (
        <Box mt={4}>
          <Text fontSize="xl" fontWeight="bold">
            Color Name: {colorName}
          </Text>
          {colorSwatch && <Box mt={2} dangerouslySetInnerHTML={{ __html: colorSwatch }} />}
        </Box>
      )}
      <SimpleGrid columns={[2, null, 3]} spacing={4} mt={8}>
        {exampleColors.map((color) => (
          <ExampleColor key={color.hex} hex={color.hex} name={color.name} onClick={() => setHexCode(color.hex)} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Index;
