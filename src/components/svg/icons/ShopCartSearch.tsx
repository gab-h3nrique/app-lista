import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

// import { ReactComponent as SquarePollSvg } from '.src/assets/svgs/items.svg';

const ShopCartSearch = (props: any) => {

  return (
    <>
      <Svg height={50} width={50} viewBox="0 0 74 72" { ...props }>
        <Path d={"M73.7109 14.6134C73.5912 14.4663 73.4406 14.3478 73.27 14.2664C73.0993 14.185 72.9129 14.1428 72.7241 14.1428H19.1379C18.7995 14.1428 18.475 14.2783 18.2358 14.5194C17.9965 14.7605 17.8621 15.0875 17.8621 15.4285C17.8621 15.7695 17.9965 16.0966 18.2358 16.3377C18.475 16.5788 18.7995 16.7143 19.1379 16.7143H29.5649L31.0231 24.4285H22.9655C22.6271 24.4285 22.3026 24.564 22.0633 24.8051C21.8241 25.0462 21.6896 25.3733 21.6896 25.7143C21.6896 26.0552 21.8241 26.3823 22.0633 26.6234C22.3026 26.8645 22.6271 27 22.9655 27H31.5092L32.9673 34.7143H26.7931C26.4547 34.7143 26.1302 34.8497 25.8909 35.0908C25.6517 35.3319 25.5172 35.659 25.5172 36C25.5172 36.341 25.6517 36.668 25.8909 36.9091C26.1302 37.1502 26.4547 37.2857 26.7931 37.2857H33.4533L34.3612 42.0886L29.26 42.4314C28.9299 42.4538 28.6214 42.6044 28.3994 42.8516C28.1775 43.0988 28.0595 43.4232 28.0703 43.7564C28.0812 44.0896 28.22 44.4055 28.4575 44.6375C28.6951 44.8695 29.0127 44.9995 29.3435 45C29.372 45 29.4007 44.999 29.4297 44.9971L67.7055 42.4256C67.9853 42.4069 68.2511 42.2957 68.462 42.1094C68.6728 41.9231 68.8168 41.6721 68.8718 41.395L73.9753 15.6807C74.0122 15.4942 74.0077 15.3017 73.962 15.1171C73.9162 14.9326 73.8305 14.7605 73.7109 14.6134ZM69.6367 24.4285H63.308L64.839 16.7143H71.1677L69.6367 24.4285ZM67.5953 34.7143H61.2667L62.7978 27H69.1265L67.5953 34.7143ZM52.3422 40.8807L52.6995 37.2857H58.1538L57.5095 40.5336L52.3422 40.8807ZM44.5636 41.4032L44.1748 37.2857H50.135L49.765 41.0143C49.7637 41.0274 49.764 41.0403 49.7631 41.0533L44.5636 41.4032ZM62.2369 16.7143L60.7058 24.4285H53.9757L54.7412 16.7143H62.2369ZM51.4109 24.4285H42.9597L42.231 16.7143H52.1764L51.4109 24.4285ZM51.1557 27L50.3902 34.7143H43.9311L43.202 27H51.1557ZM52.9546 34.7143L53.7202 27H60.1952L58.6641 34.7143H52.9546ZM32.1624 16.7143H39.6675L40.3965 24.4285H33.6206L32.1624 16.7143ZM34.1067 27H40.6396L41.3685 34.7143H35.5646L34.1067 27ZM36.0508 37.2857H41.6116L42.017 41.5743L36.926 41.9163L36.0508 37.2857ZM60.1468 40.3563L60.7562 37.2857H67.085L66.5611 39.9254L60.1468 40.3563Z"} fill="#E9EEF2"/>
        <Path d={"M26.7931 72.0001C31.0209 72.0001 34.4483 68.5463 34.4483 64.2858C34.4483 60.0253 31.0209 56.5715 26.7931 56.5715C22.5653 56.5715 19.1379 60.0253 19.1379 64.2858C19.1379 68.5463 22.5653 72.0001 26.7931 72.0001Z"} fill="#4F5659"/>
        <Path d={"M26.7932 66.8572C28.2025 66.8572 29.3449 65.7059 29.3449 64.2858C29.3449 62.8656 28.2025 61.7144 26.7932 61.7144C25.3839 61.7144 24.2415 62.8656 24.2415 64.2858C24.2415 65.7059 25.3839 66.8572 26.7932 66.8572Z"} fill="#E9EEF2"/>
        <Path d={"M66.3446 72.0001C70.5725 72.0001 73.9998 68.5463 73.9998 64.2858C73.9998 60.0253 70.5725 56.5715 66.3446 56.5715C62.1168 56.5715 58.6895 60.0253 58.6895 64.2858C58.6895 68.5463 62.1168 72.0001 66.3446 72.0001Z"} fill="#4F5659"/>
        <Path d={"M66.3447 66.8572C67.754 66.8572 68.8964 65.7059 68.8964 64.2858C68.8964 62.8656 67.754 61.7144 66.3447 61.7144C64.9354 61.7144 63.793 62.8656 63.793 64.2858C63.793 65.7059 64.9354 66.8572 66.3447 66.8572Z"} fill="#E9EEF2"/>
        <Path d={"M29.3448 51.4287V43.7144L18.3853 4.44675C18.2347 3.90708 17.9132 3.43181 17.4698 3.09328C17.0263 2.75476 16.4853 2.57155 15.929 2.57153H2.55172C1.87496 2.57153 1.22592 2.84245 0.747383 3.32469C0.268841 3.80692 0 4.46098 0 5.14296C0 5.82495 0.268841 6.479 0.747383 6.96124C1.22592 7.44347 1.87496 7.71439 2.55172 7.71439H12.1097C12.6641 7.71436 13.2034 7.89629 13.6461 8.23265C14.0888 8.56902 14.4107 9.04152 14.5632 9.57868L24.2414 43.7144V56.5715H71.4483C72.125 56.5715 72.7741 56.3006 73.2526 55.8184C73.7312 55.3361 74 54.6821 74 54.0001C74 53.3181 73.7312 52.6641 73.2526 52.1818C72.7741 51.6996 72.125 51.4287 71.4483 51.4287H29.3448Z"} fill="#DADCDE"/>
        <Path d={"M10.2069 2.57153V7.71439H2.55172C1.87496 7.71439 1.22592 7.44347 0.747383 6.96124C0.268841 6.479 0 5.82495 0 5.14296C0 4.46098 0.268841 3.80692 0.747383 3.32469C1.22592 2.84245 1.87496 2.57153 2.55172 2.57153H10.2069Z"} fill="#8B5CF6"/>
        <Path d={"M47.2068 30.8571C55.6625 30.8571 62.5172 23.9495 62.5172 15.4286C62.5172 6.90761 55.6625 0 47.2068 0C38.7512 0 31.8965 6.90761 31.8965 15.4286C31.8965 23.9495 38.7512 30.8571 47.2068 30.8571Z"} fill="#8B5CF6"/>
        <Path d={"M53.5864 23.1428C53.4188 23.143 53.2528 23.1099 53.098 23.0452C52.9432 22.9806 52.8025 22.8858 52.6842 22.7662L47.5807 17.6234C47.3415 17.3823 47.207 17.0552 47.207 16.7142C47.207 16.3732 47.3415 16.0462 47.5807 15.8051C47.82 15.5639 48.1445 15.4285 48.4829 15.4285C48.8213 15.4285 49.1458 15.5639 49.3851 15.8051L54.4886 20.9479C54.667 21.1277 54.7885 21.3568 54.8378 21.6062C54.887 21.8556 54.8617 22.1142 54.7652 22.3491C54.6686 22.584 54.5051 22.7848 54.2952 22.9261C54.0854 23.0674 53.8387 23.1428 53.5864 23.1428Z"} fill="#E9EEF2"/>
        <Path d={"M45.9311 19.2857C48.7496 19.2857 51.0345 16.9832 51.0345 14.1429C51.0345 11.3025 48.7496 9 45.9311 9C43.1125 9 40.8276 11.3025 40.8276 14.1429C40.8276 16.9832 43.1125 19.2857 45.9311 19.2857Z"} fill="#8B5CF6"/>
        <Path d={"M45.9311 20.5715C44.6694 20.5715 43.436 20.1945 42.3869 19.4881C41.3378 18.7817 40.5202 17.7777 40.0374 16.603C39.5545 15.4284 39.4282 14.1358 39.6743 12.8888C39.9205 11.6418 40.5281 10.4963 41.4202 9.59724C42.3124 8.69819 43.4491 8.08593 44.6865 7.83788C45.924 7.58983 47.2067 7.71714 48.3723 8.2037C49.538 8.69027 50.5343 9.51423 51.2353 10.5714C51.9362 11.6286 52.3104 12.8715 52.3104 14.1429C52.3085 15.8473 51.6358 17.4813 50.4398 18.6865C49.2439 19.8917 47.6224 20.5696 45.9311 20.5715ZM45.9311 10.2858C45.174 10.2858 44.434 10.512 43.8046 10.9358C43.1751 11.3597 42.6845 11.9621 42.3948 12.6669C42.1051 13.3717 42.0293 14.1472 42.177 14.8954C42.3247 15.6436 42.6893 16.3309 43.2246 16.8703C43.7599 17.4098 44.4419 17.7771 45.1843 17.926C45.9268 18.0748 46.6964 17.9984 47.3958 17.7065C48.0952 17.4145 48.693 16.9201 49.1136 16.2858C49.5342 15.6515 49.7587 14.9058 49.7587 14.1429C49.7575 13.1203 49.3538 12.1399 48.6363 11.4168C47.9187 10.6937 46.9458 10.287 45.9311 10.2858Z"} fill="#E9EEF2"/>
      </Svg>
    </>

  );
};

export default ShopCartSearch;
