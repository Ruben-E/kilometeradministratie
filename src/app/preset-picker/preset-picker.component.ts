import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ride} from "../ride";
import {Preset} from "../preset";
import {PresetService} from "../preset.service";

@Component({
  selector: 'app-preset-picker',
  templateUrl: './preset-picker.component.html',
  styleUrls: ['./preset-picker.component.scss']
})
export class PresetPickerComponent implements OnInit {

  @Input() sheetId: string;
  @Output() selected = new EventEmitter<Preset>();

  presets: Preset[];
  loading: boolean = true;

  constructor(private presetService: PresetService) {
  }

  ngOnInit() {
    this.getPresets();
  }

  getPresets() {
    this.loading = true;
    this.presetService.getPresets(this.sheetId).subscribe(presets => {
      this.presets = presets;
      this.loading = false;
    })
  }

  presetSelected(preset: Preset) {
    this.selected.emit(preset);
  }
}
