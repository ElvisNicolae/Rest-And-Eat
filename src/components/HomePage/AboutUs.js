import React from 'react';
import "./AboutUs.scss";
import ReactMarkdown from 'react-markdown';
import { useQuery, gql } from '@apollo/client';

const ABOUTDATA = gql`
    query getAboutUsData {
        aboutpage {
            data {
                attributes {
                    about_heading,
                    about_paragraph,
                    about_lists {
                        data {
                            attributes {
                                list_elm_heading,
                                list_elm_paragraph
                            }
                        }
                    }
                }
            }
        }
    }
`;


const AboutUs = () => {
    const { data } = useQuery(ABOUTDATA);

    const renderList = data && data.aboutpage.data.attributes.about_lists.data.map((elm, index) => {
        return (
            <li className="about-us__elm" key={index}>
                <h2 className="about-us__elm-number">0{index+1}</h2>
                <div className="about-us__elm-text">
                    <h3 className="about-us__elm-heading">
                        {elm.attributes.list_elm_heading}
                    </h3>
                    <p className="about-us__elm-paragraph">
                        {elm.attributes.list_elm_paragraph}
                    </p>
                </div>
            </li>
        );
    })

    return (
        <section className="about-us" id='about-us'>
            <div className="about-us__img-text-container">
                <div className="about-us__img">
                    <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="chef preparing a dish" />
                </div>
                
                <div className="about-us__text-container">
                    <h2 className="about-us__heading">
                        {data ? data.aboutpage.data.attributes.about_heading : "Default Heading"}
                    </h2>

                    <ReactMarkdown className="about-us__paragraph">
                        {data ? data.aboutpage.data.attributes.about_paragraph : "Default paragraph"}
                    </ReactMarkdown>
                </div>
            </div>

            <ul className="about-us__list">
                {renderList}
            </ul>
        </section>
    )
}

export default AboutUs