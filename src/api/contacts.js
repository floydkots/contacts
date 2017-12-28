
export default {
  fetch: () => {
    return [
      {
        id: 1,
        fullName: "Floyd Kots",
        dateOfBirth: "1993-10-16",
        avatar: "../public/avatars/floydkots_avatar.jpg",
        emails: [
          {id: 0, value: "floyd@kots.pro", label: "Work"},
          {id: 1, value: "floyd@kots.io", label: "Other"}
        ],
        phones: [{id: 0, value: "0704 684 969", label: "Home"}],
        addresses: [
          {id: 0, value: "Nairobi, Kenya", label: "Work"},
          {id: 1, value: "Othoro, Kenya", label: "Home"}
        ],
        starred: false,
        hidden: false,
      },
      {
        id: 2,
        fullName: "Mervin Trever",
        dateOfBirth: "1993-10-16",
        avatar: "../public/avatars/mervin_avatar.jpg",
        emails: [{id: 0, value: "floydkots@gmail.com", label: "Work"}],
        phones: [
          {id: 0, value: "0738 120 774", label: "Home"},
          {id: 1, value: "0724 299 158", label: "Other"}
        ],
        addresses: [{id: "0", value: "Kisumu, Kenya", label: "Work"}],
        starred: false,
        hidden: false,
      }
    ]
  }
};
