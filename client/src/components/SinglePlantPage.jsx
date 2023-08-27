import { Box, Heading, Image, Text, HStack, Grid, useDisclosure, Link, List,ListItem, Avatar, Flex, Spacer } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function formatDate(inputDate) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const [year, month, day] = inputDate.split('-');
  const formattedDate = `${parseInt(day)}${getOrdinalSuffix(parseInt(day))} ${months[parseInt(month) - 1]} ${year.slice(2)}`;

  return formattedDate;
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

const inputDate = "2023-08-25";
const formattedDate = formatDate(inputDate);
console.log(formattedDate); // Output: 25th Aug 23


const SinglePlantPage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState({});
  const [user,setUser]=useState()
  const { isOpen, onToggle } = useDisclosure();

  const getPlant = (id) => {
axios.get(`https://gardenease.onrender.com/posts/${id}`)
      .then(res => {
        setPlant(res.data);
        getUser(res.data.userId)
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPlant(id);
  }, []);

  function getUser(_id){
    console.log("getyUser")
    axios.get(`https://gardenease.onrender.com/users/${_id}`)
      .then(res => {
        setUser(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const navigationBarHeight = 120; // Adjust this value based on your actual navigation bar height
  
    if (element) {
      const scrollToPosition = element.getBoundingClientRect().top + window.pageYOffset - navigationBarHeight;
      window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    }
  };
  

  return (
    <Box w="80%" margin="auto">
      <Box p="10px">
        <Text style={{ backgroundColor: "#6db644", width: "fit-content", borderRadius: "15px", padding: "0px 5px", color: "White", marginTop:"20px", margin: "10px 0px" }}>PLANTS</Text>
        <Heading>{plant.english_name}</Heading>
      </Box>
      <Box w="80%" p="10px">
        <Flex flexWrap="wrap">
        <HStack>
        <Avatar name={plant.userName} src={user?.profilePicture}/>
        <Text fontSize="18px" fontWeight="500">{plant.userName}</Text>
        </HStack>
        <Spacer/>
        <Box>
        {plant?.createdAt?.split("T")[0] &&
        <Text marginTop="10px" justifyContent="flex-end" >Posted on {formatDate(plant?.createdAt?.split("T")[0])}</Text>
      }
        </Box>
      </Flex>
        <Heading color="#636363" margin="5px 0px" size="md">{plant?.description}</Heading>
      </Box>
      <HStack borderRadius="15px" w="80%" backgroundColor={{ base: 'none', md: "#6db644" }} spacing="5px" color="white">
        <Box w="20%">
        <Box fontWeight="medium" display={{ base: 'none', md: 'block' }} margin="0px 10px" lineHeight={{ base: '20px', md: '30px' }}>
          <List spacing={2}>
            <ListItem>
            <Link onClick={() => scrollToSection('factSheet')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>FactSheet</Link>
            </ListItem>
            <ListItem>
            <Link onClick={() => scrollToSection('origin')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>Origin</Link>
            </ListItem>
            <ListItem>
            <Link onClick={() => scrollToSection('location')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>Location</Link>
            </ListItem>
            <ListItem>
            <Link onClick={() => scrollToSection('fertilizer')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>Fertilizer</Link>
            </ListItem>
            <ListItem>
            <Link onClick={() => scrollToSection('diseases')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>Diseases and Pest</Link>
            </ListItem>
            <ListItem>
            <Link onClick={() => scrollToSection('diseases')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>FLowers</Link>
            </ListItem>
            <ListItem>
            <Link onClick={() => scrollToSection('diseases')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>Fruit</Link>
            </ListItem>
            <ListItem>
            <Link onClick={() => scrollToSection('diseases')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>Leaves</Link>
            </ListItem>
            <ListItem>
            <Link onClick={() => scrollToSection('diseases')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>Soil</Link>
            </ListItem>
            <ListItem>
            <Link onClick={() => scrollToSection('diseases')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>Planting</Link>
            </ListItem>
            <ListItem>
            <Link onClick={() => scrollToSection('diseases')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>Care</Link>
            </ListItem>
            <ListItem>
            <Link onClick={() => scrollToSection('diseases')} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>Utilization</Link>
            </ListItem>
          </List>
          </Box>
        </Box>
        <Image w={{ base: '100%', md: '80%' }} h="500px" borderRadius="inherit" borderRightRadius="inherit" src={plant.image} />
      </HStack>
      <Box>
        <Heading color="#6db644" fontSize={{ base: '2rem', md: '3rem' }} marginTop="1.5rem" marginBottom="2rem" id="factSheet">Factsheet</Heading>
        <Grid  templateRows={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={2}>
                    <HStack>
                    <Image
                        w={"35px"}
                        src="https://www.mygarden.com/themes/custom/infinite/msg_infinite/images/icons/plants/i-wuchstyp.svg"
                        />
                    <Box>
                    <Text
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontSize="20px"
                        fontWeight={700}
                        pl={"5px"}
                        pr={"10px"}
                        >
                        Growth Type
                    </Text>
                    <Text fontWeight={500} fontSize="18px" color="#636363" marginLeft="5px">{plant?.category}</Text>
                    </Box>
                </HStack>
                <HStack>
                <Image
                        w={"35px"}
                        src="https://www.mygarden.com/themes/custom/infinite/msg_infinite/images/icons/plants/i-gartenstil.svg"
                        />
                        <Box>
                    <Text
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontSize="20px"
                        fontWeight={700}
                        pl={"5px"}
                        pr={"10px"}
                        >
                        Garden Style
                    </Text>
                    <Text fontWeight={500} fontSize="18px" color="#636363" marginLeft="5px">
                        {plant.factSheet?.garden_style}
                    </Text>
                            </Box>
                </HStack>
                <HStack>
                <Image
                        w={"35px"}
                        src="https://www.mygarden.com/themes/custom/infinite/msg_infinite/images/icons/plants/i-blutenfarbe.svg"
                        />
                        <Box>
                    <Text
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontSize="20px"
                        fontWeight={700}
                        pl={"5px"}
                        pr={"10px"}
                        >
                        Flower color
                    </Text>
                    <Text fontWeight={500} fontSize="18px" color="#636363" marginLeft="5px">{plant?.factSheet?.flower_color}</Text>
                    </Box>
                </HStack>
                <HStack>
                <Image
                        w={"35px"}
                        h={"45px"}
                        src="https://www.mygarden.com/themes/custom/infinite/msg_infinite/images/icons/plants/i-wuchshohe.svg"
                        />
                    <Box>
                    <Text
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontSize="20px"
                        fontWeight={700}
                        pl={"5px"}
                        pr={"10px"}
                        >
                        Growth height
                    </Text>
                    <Text fontWeight={500} fontSize="18px" color="#636363" marginLeft="5px">{plant?.factSheet?.growth_height}</Text>
                            </Box>
                </HStack>
                <HStack>
                <Image
                        w={"35px"}
                        src="https://www.mygarden.com/themes/custom/infinite/msg_infinite/images/icons/plants/i-licht.svg"
                        />
                                        <Box>
                    <Text
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontSize="20px"
                        fontWeight={700}
                        pl={"5px"}
                        pr={"10px"}
                        >
                        Light
                    </Text>
                    <Text fontWeight={500} fontSize="18px" color="#636363" marginLeft="5px">{plant?.factSheet?.light}</Text>
                            </Box>
                </HStack>
        </Grid>
      </Box>
      <Box w="80%" marginBottom="3rem">
        <Box >
          <Heading color="#6db644" fontSize={{ base: '2rem', md: '3rem' }} marginTop="1.5rem" marginBottom="2rem" id="origin">Origin</Heading>
          <Text fontSize="1.3rem" color="#636363">{plant?.origin}</Text>
        </Box>
        <Box>
          <Heading color="#6db644" fontSize={{ base: '2rem', md: '3rem' }} marginTop="1.5rem" marginBottom="2rem" id="location">Location</Heading>
          <Text fontSize="1.3rem" color="#636363">{plant?.location}</Text>
        </Box>
        <Box>
          <Heading color="#6db644" fontSize={{ base: '2rem', md: '3rem' }} marginTop="1.5rem" marginBottom="2rem" id="fertilizer">Fertilizer</Heading>
          <Text fontSize="1.3rem" color="#636363">{plant?.fertilizing}</Text>
        </Box>
        <Box marginBottom="3rem">
          <Heading color="#6db644" fontSize={{ base: '2rem', md: '3rem' }} marginTop="1.5rem" marginBottom="2rem" id="diseases">Diseases and Pest</Heading>
          <Text fontSize="1.3rem" color="#636363">{plant?.diseases_pests}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SinglePlantPage;