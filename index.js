// docs were GPT assisted

/*
 * Adjusts the top margin of all <section> elements based on the device's screen width.
 * This is necessary to account for the fixed-position header, ensuring content is not obscured.
 * Note: The layout may break or become misaligned since the marginTop is set only once 
 * during initial load.
 */
const sections = () => {
  const marginTop = screen.width < 600 ? "120px" : "70px"
  document.querySelectorAll("section").forEach(s => {
      s.style.marginTop = marginTop
  })
}
sections()


/* 
* Toggles the visibility of the <header> element based on the user's scroll direction.
*/
const header = () => {
  let lastScrollTop = 0;
  // get initial header height
  const header = document.querySelector("header")
  const initialHeigh = screen.width < 600 ? "120px" : "70px"

  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY

    if (currentScrollTop > lastScrollTop) {
      // scrolling down
      header.style.height = "0"

    } else if (currentScrollTop < lastScrollTop) {
      // scrolling up
      header.style.height = initialHeigh
    }

    lastScrollTop = currentScrollTop;
  });
}
header()

/*
 * Manages the navigation buttons and dynamically controls the display of sections 
 * based on user interaction.
 * All sections are rendered on the first load to allow indexing for SEO or other 
 * purposes.
 * The first navigation button ("Tudo") is selected by default, and its text is changed 
 * to ("Perfil") after the initial render to reflect the SPA behavior.
*/
const nav = () => {
  const navButtons = document.querySelectorAll(".nav-button")

  navButtons.forEach(button => {
    button.onclick = e => handleActive(e)
  })

  const handleActive = e => {
    window.scrollTo(0, 0)
    // reset active button
    navButtons.forEach(button => {
      button.classList.remove("active")

      // handle first render 
      if (button.textContent == "Tudo") {
        button.textContent = "Perfil"
      }
    })

    // active target
    const btn = e.target
    btn.classList.add("active")

    // hide sections
    const sections = document.querySelectorAll("section")
    sections.forEach(s => {
      s.style.display = "none"
    })

    // render correct section
    const sID = btn.id.substring(4)
    const s = document.querySelector(`#${sID}`)
    s.style.display = "block"
  }
}
nav()


/*
* Adjusts the display name for mobile devices by shortening it to fit better on smaller screens.
*/
const banner = () => {
  if (screen.width < 600) {
      document.querySelector("#name").textContent = "Marconi S."
  }
}
banner()