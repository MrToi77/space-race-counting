import ButtonChoiceDTO from "../DTOs/ButtonChoiceDTO";
import PlaySceneDeclare from "../Declare/PlaySceneDeclare";

export default class ButtonChoiceService {
  private declare: PlaySceneDeclare;
  constructor(declare: PlaySceneDeclare) {
    this.declare = declare;
  }

  public createButtonChoiceData(): ButtonChoiceDTO[] {
    const ButtonDataContainer: ButtonChoiceDTO[] = [];
    const spacingX = 100;  // khoảng cách ngang giữa các nút
    const spacingY = 100;  // khoảng cách dọc giữa các nút
    const perRow = 5;      // số nút mỗi hàng

    for (let i = 0; i < this.declare.ButtonChoiceAmount; i++) {
      const col = i % perRow;                   // cột (0–4)
      const row = Math.floor(i / perRow);       // hàng (0, 1, 2, …)
      const positionX = col * spacingX - 200;         // tính X
      const positionY = row * spacingY + 25;         // tính Y

      const label = `${i + 1}`;
      const ButtonData = new ButtonChoiceDTO(positionX, positionY, label, i + 1);
      ButtonDataContainer.push(ButtonData);
    }

    return ButtonDataContainer;
  }
}
