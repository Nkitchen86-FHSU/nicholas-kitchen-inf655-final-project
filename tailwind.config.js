import withMT from "@material-tailwind/react/utils/withMT"

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend:{
      colors: {
        "custom-dark-navy-blue": "#000435",
        "custom-dark-gray": "#0C0C0B"
      }
    }
  },
  plugins: []
});

