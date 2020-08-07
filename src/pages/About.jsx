import React from 'react';
import { Popup, View, Page, Navbar, Link, Icon, Block } from 'framework7-react';

const About = () => {
  return (
    <Popup class="about about-popup" closeOnEscape push>
      <View>
        <Page className="about-page">
          <Navbar title="About" transparent>
            <Link slot="right" popupClose>
              <Icon ios="f7:xmark" md="material:close" size={24} />
            </Link>
          </Navbar>
          <Block>
            <h1 className="page-title">About</h1>
          </Block>
          <Block>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
              beatae ut, velit cumque corrupti vitae ad et molestias placeat
              incidunt rem dolore accusamus, labore numquam cum voluptatum
              ratione similique mollitia.
            </p>
            <p>
              Explicabo sint, voluptatibus temporibus aut sed laboriosam magnam
              optio inventore quis accusamus ad perspiciatis non ducimus beatae
              asperiores et distinctio veniam reprehenderit commodi vitae ullam.
              Minus a nam alias corrupti?
            </p>
            <p>
              Ducimus recusandae, cum iste perspiciatis libero numquam suscipit
              sequi impedit incidunt aut sint et autem ab mollitia modi. Dolore
              a ut fuga maiores repellendus consequuntur culpa doloribus
              suscipit possimus voluptates.
            </p>
            <p>
              Vero nobis ut tempore, ad sit dolore praesentium, consequuntur,
              nulla unde mollitia odio exercitationem assumenda aperiam.
              Consequuntur eos, debitis alias at magni sequi rem corrupti
              quisquam voluptates explicabo magnam facere?
            </p>
            <p>
              Atque voluptatum maiores vitae tempore suscipit rerum! Fugiat non
              cupiditate, vitae quasi neque nostrum, sapiente quod error eius
              tempore adipisci incidunt dolorem iste laboriosam expedita debitis
              aut exercitationem dolore corporis.
            </p>
            <p>
              Perferendis natus consectetur atque, maxime dignissimos sit
              tenetur saepe veritatis impedit exercitationem animi facilis unde
              similique, molestias autem eum nemo dolor iure quas ex itaque
              dicta, sint quod? Qui, fuga.
            </p>
            <p>
              Non, corrupti? Dolorem voluptate qui blanditiis ratione ipsum non
              eius laboriosam perspiciatis minus vero. Possimus fugit impedit,
              eveniet doloremque aut modi ratione architecto tempore dicta, quam
              culpa iusto maxime necessitatibus!
            </p>
            <p>
              Dolorem iusto consectetur tenetur laborum distinctio architecto
              rerum obcaecati debitis aperiam aliquam fugiat reprehenderit
              facere omnis illum sequi velit, repudiandae amet possimus ducimus
              similique reiciendis odio molestias. Alias, sequi nihil!
            </p>
            <p>
              Quasi dolore debitis quis reiciendis nulla, hic inventore cum quas
              rem delectus et! Quasi maiores tempore modi! Inventore veritatis
              odit officia cum eveniet optio cupiditate! Dolore perspiciatis
              sequi deleniti ratione.
            </p>
            <p>
              Consectetur porro laudantium, ex deleniti omnis molestias quae
              reiciendis dolorem voluptatibus amet nostrum vel provident dolorum
              repellendus at deserunt nisi culpa, illum atque. Voluptatem
              molestiae dolorem provident corporis at commodi.
            </p>
          </Block>
        </Page>
      </View>
    </Popup>
  );
};

export default About;
