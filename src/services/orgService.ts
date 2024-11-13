import orgModel from "../models/orgModel";

export const sidInit = async () => {
  try {
    const orgs = [
      {
        orgName: "IDF - North",
        resources: [
          {
            name: "Iron Dome",
            amount: 25,
          },
          {
            name: "David's Sling",
            amount: 15,
          },
        ],
        budget: 8000000,
      },
      {
        orgName: "IDF - South",
        resources: [
          {
            name: "Iron Dome",
            amount: 30,
          },
          {
            name: "Patriot",
            amount: 20,
          },
        ],
        budget: 9000000,
      },
      {
        orgName: "IDF - Center",
        resources: [
          {
            name: "Iron Dome",
            amount: 40,
          },
          {
            name: "Arrow",
            amount: 10,
          },
        ],
        budget: 10000000,
      },
      {
        orgName: "IDF - West Bank",
        resources: [
          {
            name: "Iron Dome",
            amount: 10,
          },
        ],
        budget: 7000000,
      },
      {
        orgName: "Hezbollah",
        resources: [
          {
            name: "Fajr-5",
            amount: 20,
          },
          {
            name: "Zelzal-2",
            amount: 10,
          },
        ],
        budget: 3000000,
      },
      {
        orgName: "Hamas",
        resources: [
          {
            name: "Qassam",
            amount: 50,
          },
          {
            name: "M-75",
            amount: 30,
          },
        ],
        budget: 2500000,
      },
      {
       orgName: "IRGC",
        resources: [
          {
            name: "Shahab-3",
            amount: 15,
          },
          {
            name: "Fateh-110",
            amount: 25,
          },
        ],
        budget: 4000000,
      },
      {
        orgName: "Houthis",
        resources: [
          {
            name: "Badr-1",
            amount: 20,
          },
          {
            name: "Quds-1",
            amount: 15,
          },
        ],
        budget: 2000000,
      },
    ];
    // for (const org of orgs) {
    //   const newOrg = new orgModel(org);
    //   await newOrg.save();
    // }
    await orgModel.insertMany(orgs);
    
  } catch (error) {
    console.log(
      "Error accorde while creating initial state of candidate",
      error
    );
  }
};
