interface cardProps {
  id?: string | number;
  title?: string | number;
  subtitle?: string | number;
  content?: string | number;
  
 
}

const SubsidiaryRoutes:cardProps[] = [
    { id: 1, title: "T+1", subtitle: "Merchants are settled 1 day after transaction", content: "Settlement cycle: 1" },
    { id: 1, title: "T+5", subtitle:"Merchants are settled 5 days after transaction"   ,  content:"Settlement cycle: 15"},
    { id: 1, title: "T+10", subtitle: "Merchants are settled 10 days after transaction" , content: "Settlement cycle: 10" },
    { id: 1, title: "T+15", subtitle:"Merchants are settled 15 days after transaction"   ,  content:"Settlement cycle: 15"},
    { id: 1, title: "T+30", subtitle:"Merchants are settled 30 days after transaction"   ,  content:"Settlement cycle: 30"},
   
    
  ];
  
  export default SubsidiaryRoutes;
  